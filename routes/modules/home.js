const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: "asc" })
    .then((checkedCategories) => {
      Record.find()
        .populate("categoryId")
        .lean()
        .sort({ _id: "asc" })
        .then((records) => {
          let totalAmount = 0;
          records.forEach((record) => (totalAmount += record.amount));
          res.render("index", { totalAmount, records });
        });
    });
});

module.exports = router;
