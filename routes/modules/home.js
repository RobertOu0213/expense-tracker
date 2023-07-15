const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/", (req, res) => {
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

router.get("/search", (req, res) => {
  const categoryId = req.query.categoryId;
  let totalAmount = 0;

  if (categoryId) {
    Category.findOne({ name: categoryId }).then((categories) => {
      Record.find({ categoryId: categories._id })
        .populate("categoryId")
        .lean()
        .then((records) => {
          records.forEach((record) => (totalAmount += record.amount));
          res.render("index", { totalAmount, records });
        });
    });
  }
});

module.exports = router;
