var mongoose = require("mongoose");

//Adding this so that when dazzfun event is removed; comment is also removed from the DB
/*
const Comment = require('./comment');
dazzfunSchema.pre('remove', async function() {
	await Comment.remove({
		_id: {
			$in: this.comments
		}
	});
});
*/
// Schema Setup
var dazzfunSchema = new mongoose.Schema({
    event: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [ 
        {
            type: mongoose.Schema.Types.ObjectId, // referencing the commentId
            ref: "Comment"
        }
    ]
});

// Compiling the schema into a model

 module.exports = mongoose.model("Dazzfun", dazzfunSchema);