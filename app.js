const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const methodOverride = require("method-override");
const routes = require("./routes/index");

require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "ThisIsAnApple",
    resave: false,
    saveUninitialized: true,
  })
);

//body parser
app.use(express.urlencoded({ extended: true }));

//method override
app.use(methodOverride("_method"));
// routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
