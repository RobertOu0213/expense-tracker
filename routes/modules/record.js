const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const record = req.body;
  Category.findOne({ name: record.categoryId }).then((category) => {
    record.categoryId = category._id;
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
  //使用populate()
  Record.findById(_id)
    .populate("categoryId")
    .lean()
    .then((record) => {
      res.render("edit", { record });
    })
    .catch((error) => console.log(error));

  //不使用populate()
  // Record.findById(_id)
  //   .lean()
  //   .then((record) => {
  //     Category.findById(record.categoryId)
  //       .lean()
  //       .then((category) => {
  //         res.render("edit", { record, category });
  //       })
  //       .catch((error) => console.log(error));
  //   });
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  const update = req.body;

  Record.findOne({ _id })
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

  Category.findOne({ name: update.categoryId })
    .then((category) => {
      update.categoryId = category._id;

      Record.findOneAndUpdate({ _id }, req.body)
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

  Record.findOne({ _id })
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

  Record.findOneAndRemove({ _id })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
