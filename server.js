// Require packages ===========================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

//make models visible to server
var db = require("./models");

var PORT = 7000;

//initalize express
var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/simpleMongo");

// Routes =====================================


// Start server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});