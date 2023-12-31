const mongoose = require("mongoose");
const Record = require("../../models/record");
const Category = require("../category");
const User = require("../user");
const recordList = require("./record.json").results;
const bcrypt = require("bcryptjs");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

const SEED_USER = {
  name: "User",
  email: "user@gmail.com",
  password: "12345678",
};

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash,
      })
    )
    .then((user) => {
      for (let i = 0; i < 3; i++) {
        recordList[i].userId = user._id;
      }
      return recordList;
    })
    .then((recordList) => {
      Category.find()
        .lean()
        .then((categories) => {
          const categoriesId = [];
          categories.forEach((category) => categoriesId.push(category._id));
          return categoriesId;
        })
        .then((id) => {
          for (let i = 0; i < 3; i++) {
            recordList[i].categoryId = id[i];
          }
          return Record.create(recordList);
        })
        .then(() => {
          console.log("done");
          process.exit();
        });
    });
});
