var mongoose = require("mongoose"),
    Dazzfun  = require("./models/dazzfun"),
    Comment  = require("./models/comment");

// Creating an array of static data    
var data = [
    {
        event: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2580/3676091444_6a600d1e60.jpg",
        description: "awesome site to see"
    },
    {
        event: "Shells Basin",
        image: "https://farm9.staticflickr.com/8015/7495067468_b366013909.jpg",
        description: "Amazing viewing"
    },
    {
        event: "Paradise siting",
        image: "https://farm5.staticflickr.com/4247/34518518980_43679f6559.jpg",
        description: "Most seen paradise"
    }
    
    ];

// Remove all events    
function seedDB(){
    Dazzfun.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed dazzfuns!");
        Comment.remove({}, function(err){
            if (err){
                console.log(err);
            }
            console.log("removed comments");
       
        // add a few dazzfun events to start with
            data.forEach(function(seed){
                Dazzfun.create(seed, function(err, dazzfun){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Added a dazzfun event");
                        // Creating a comment on the event
                        Comment.create(
                            {
                                text: "This is awesome, loving every bit of it",
                                author: "Samson"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    dazzfun.comments.push(comment);
                                    dazzfun.save();
                                    console.log("Created a new comment");
                                }
                            });
                    }
                });
        });
        
    });
});
}
module.exports = seedDB;