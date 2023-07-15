const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const record = req.body;
  // console.log(record);
  Category.findOne({ name: record.categoryId }).then((category) => {
    record.categoryId = category._id;
    record.userId = req.user._id;

    Record.create(record)
      .then((record) => {
        category.record.push(record._id);
        category.save();
      })
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
      res.render("edit", { record });
      console.log(record);
    })
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;
  const update = req.body;

  //remove record from old category
  Record.findOne({ _id, userId })
    .then((record) => {
      Category.findOne(record.categoryId)
        .then((category) => {
          category.record = category.record.filter(
            (record) => record.toString() !== _id
          );
          category.save();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

    //update record
  Category.findOne({ name: update.categoryId })
    .then((category) => {
      update.categoryId = category._id;
      Record.findOneAndUpdate({ _id, userId }, req.body)
        .then((record) => {
          category.record.push(record._id);
          category.save();
        })
        .then(() => res.redirect("/"))
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  const userId = req.user._id;

  //remove record from old category
  Record.findOne({ _id, userId })
    .then((record) => {
      Category.findOne(record.categoryId)
        .then((category) => {
          category.record = category.record.filter(
            (record) => record.toString() !== _id
          );
          category.save();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

  Record.findOneAndRemove({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
