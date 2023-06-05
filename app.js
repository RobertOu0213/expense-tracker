const express = require("express");
const app = express();
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const methodOverride = require("method-override");
const routes = require("./routes/index");
require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

//body parser
app.use(express.urlencoded({ extended: true }));

//method override
app.use(methodOverride("_method"));
// routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
