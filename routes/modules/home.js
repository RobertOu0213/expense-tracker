const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const dayjs = require("dayjs");

router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .populate("categoryId")
    .lean()
    .sort({ _id: "asc" })
    .then((records) => {
      let totalAmount = 0;
      records.forEach((record) => (totalAmount += record.amount));

      const data = records.map((record) => {
        const { _id, name, date, amount } = record;
        const formatDate = dayjs(date).format("YYYY/MM/DD");
        return {
          _id,
          name,
          date: formatDate,
          amount,
          icon: record.categoryId.icon,
        };
      });

      res.render("index", { totalAmount, records: data });
    });
});

router.get("/search", (req, res) => {
  const categoryId = req.query.categoryId;
  const userId = req.user._id;
  let totalAmount = 0;

  if (categoryId) {
    Category.findOne({ name: categoryId }).then((categories) => {
      Record.find({ categoryId: categories._id, userId })
        .populate("categoryId")
        .lean()
        .then((records) => {
          records.forEach((record) => (totalAmount += record.amount));
          
          const data = records.map((record) => {
            const { _id, name, date, amount } = record;
            const formatDate = dayjs(date).format("YYYY/MM/DD");
            return {
              _id,
              name,
              date: formatDate,
              amount,
              icon: record.categoryId.icon,
            };
          });

          res.render("index", { totalAmount, records:data });
        });
    });
  }
});

module.exports = router;
