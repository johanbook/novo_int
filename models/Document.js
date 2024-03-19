const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        enum : ['CV', 'Resume', 'Cover Letter'],
        default: 'Resume'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Document = mongoose.model("document", DocumentSchema);