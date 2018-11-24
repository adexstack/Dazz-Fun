var mongoose = require("mongoose");
// Shema Setup
var dazzfunSchema = new mongoose.Schema({
    event: String,
    image: String,
    description: String,
    comments: [ 
        {
            type: mongoose.Schema.Types.ObjectId, // referencing the commentId
            ref: "Comment"
        }
    ]
});

// Compiling the schema into a model

 module.exports = mongoose.model("Dazzfun", dazzfunSchema);