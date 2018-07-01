var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema constructors saves the outline for each article doc
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    //note is a reference to another schema model
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//create the model
var Article = mongoose.model("Article", ArticleSchema);

//export the article
module.exports = Article;