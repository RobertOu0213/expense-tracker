const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
