const express = require("express");
const app = express();
const session = require("express-session");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const usePassport = require("./config/passport");
const routes = require("./routes/index");
const flash = require("connect-flash");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

 require("dotenv").config();

const PORT = process.env.PORT;

require("./config/mongoose");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
usePassport(app);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated;
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
