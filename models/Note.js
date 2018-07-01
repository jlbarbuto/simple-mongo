var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Schema constructor saves the outline for each note doc
var NoteSchema = new Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    }
});

//create the model
var Note = mongoose.model("Note", NoteSchema);

//export the note
module.exports = Note;