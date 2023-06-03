const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//body parser
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", { records }))
    .catch((error) => console.log(error));
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/records", (req, res) => {
  const { name, date, category, amount } = req.body;
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
