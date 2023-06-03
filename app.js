const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected");
});

app.get("/", (req, res) => {
  res.send("h1");
});

app.listen(PORT, () => {
  console.log(`express is listening on http://localhost:${PORT}`);
});
