var express = require('express');
var app = express();
const controller = require("../controller/")

app.post("/", controller.store)
.get('/', controller.list)
.delete('/', controller.delete)
.patch('/', controller.updateDone)
.put('/', controller.edit)
module.exports = app