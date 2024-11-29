var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const fs = require("fs");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

//Middleware
const verifyToken = require("./middleware/verify-token");

//Routes

var app = express();
app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

app.use(
  cors({
    origins: ["*"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const API_PREFIX = "/api";

module.exports = app;
