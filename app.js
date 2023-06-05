const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const methodOverride = require("method-override");
require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//body parser
app.use(express.urlencoded({ extended: true }));

//method override
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", { records }))
    .catch((error) => console.log(error));
});

app.get("/records/new", (req, res) => {
  res.render("new");
});

app.post("/records", (req, res) => {
  const { name, date, category, amount } = req.body;
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.get("/records/:id/edit", (req, res) => {
  const _id = req.params.id;
  return Record.findOne({ _id })
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((error) => console.log(error));
});

app.put("/records/:id", (req, res) => {
  const _id = req.params.id;
  return Record.findOneAndUpdate({ _id }, req.body)
    .then((record) => record.save())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.delete("/records/:id", (req, res) => {
  const _id = req.params.id;
  return Record.findOneAndRemove({ _id })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
