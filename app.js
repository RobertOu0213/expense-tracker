const express = require("express");
const app = express();
const session = require("express-session");
const PORT = 3000;
const exphbs = require("express-handlebars");
const Record = require("./models/record");
const methodOverride = require("method-override");
const usePassport = require("./config/passport");
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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
usePassport(app);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
