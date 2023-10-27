var express = require('express');
var app = express();
const controller = require("../controller/")

app.post("/", controller.store)

module.exports = app