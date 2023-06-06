const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const { name, date, amount } = req.body;
  return Record.create({ name, date, amount })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.get("/:id/edit", (req, res) => {
  const _id = req.params.id;
  return Record.findOne({ _id })
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const _id = req.params.id;
  return Record.findOneAndUpdate({ _id }, req.body)
    .then((record) => record.save())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  return Record.findOneAndRemove({ _id })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
