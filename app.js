const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  Record.find()
    .lean()
    .then((records) => res.render("index", { records }))
    .catch((error) => console.log(error));
});

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
