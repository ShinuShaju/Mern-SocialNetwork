const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 120
    },
    body: {
        type: String,
        required: "Title is required",
        minlength: 4,
        maxlength: 2500
    }
});

module.exports = mongoose.model("Post", postSchema)