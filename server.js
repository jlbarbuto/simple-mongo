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

//route scrapes the web for articles
app.get("/scrape", function(req, res){
    request("http://www.technicianonline.com/news/", function(error, response, html){
        var $ = cheerio.load(html);

        $("h3.tnt-headline").each(function(i, element){
            var result = {};

            result.title = $(element).children("a").text();
            result.link = $(element).children("a").attr("href");

            db.Article.create(result)
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
                .catch(function(err){
                    return res.json(err);
                });
        });
        res.send("Scrape Complete");
    });
});

//route gets all the articles from the db
app.get("/articles", function(req, res){
    //use the .find method to grab all articles from the db
    db.Article.find({})
        .then(function(dbArticle){
            //send success back to the client
            res.json(dbArticle);
        })
        .catch(function(err){
            //send error back to the client
            res.json(err);
        });
});

// Start server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});