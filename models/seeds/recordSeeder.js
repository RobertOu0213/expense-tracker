const mongoose = require("mongoose");
const Record = require("../../models/record");
const recordList = require("./record.json").results;
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});

db.once("open", () => {
  Record.create(recordList).then(() => {
    console.log("done");
    process.exit();
  });
});
