const mongoose = require("mongoose");
const Category = require("../../models/category");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CATEGORY = [
  ["家居物業", `<i class="fa-solid fa-house"></i>`],
  ["交通出行", `<i class="fa-solid fa-van-shuttle"></i>`],
  ["休閒娛樂", `<i class="fa-solid fa-face-grin-beam"></i>`],
  ["餐飲食品", `<i class="fa-solid fa-utensils"></i>`],
  ["其他", `<i class="fa-solid fa-pen"></i>`],
].map((category) => ({
  name: category[0],
  icon: category[1],
}));

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  Category.create(CATEGORY).then(() => {
    console.log("done");
    process.exit();
  });
});
