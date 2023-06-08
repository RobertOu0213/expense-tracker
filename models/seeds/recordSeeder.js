const mongoose = require("mongoose");
const Record = require("../../models/record");
const Category = require("../category");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  createRecords();
  console.log("done");
  // process.exit();
});

function createRecords() {
  Category.find()
    .lean()
    .then((categories) => {
      const categoriesId = [];
      categories.forEach((category) => categoriesId.push(category._id));
      return categoriesId;
    })
    .then((id) => {
      for (let i = 0; i < 5; i++) {
        Record.create({
          name: `record-${i}`,
          date: `2023-01-1${i}`,
          amount: 100 * (i + 10),
          categoryId: id[i],
        }).then((record) => {
          Category.findById(id[i]).then((category) => {
            category.record.push(record._id);
            category.save();
          });
        });
      }
    })
    .catch((error) => console.log(error));
}
