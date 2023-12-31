const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");
const dayjs = require("dayjs");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const record = req.body;

  Category.findOne({ name: record.categoryId }).then((category) => {
    record.categoryId = category._id;
    record.userId = req.user._id;

    Record.create(record)
      .then(() => res.redirect("/"))
      .catch((error) => console.log(error));
  });
});

router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  //使用populate()
  Record.findOne({ _id, userId })
    .populate("categoryId")
    .lean()
    .then((record) => {
      const formatDate = dayjs(record.date).format("YYYY-MM-DD");
      res.render("edit", { record, formatDate });
    })
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const update = req.body;

  //update record
  Category.findOne({ name: update.categoryId })
    .then((category) => {
      update.categoryId = category._id;
      Record.findOneAndUpdate({ _id, userId }, req.body)
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  Record.findOneAndRemove({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
