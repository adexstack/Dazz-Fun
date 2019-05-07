var mongoose = require("mongoose"),
    Dazzfun  = require("./models/dazzfun"),
    Comment  = require("./models/comment");

// Creating an array of static data    
var data = [
    {
        event: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2580/3676091444_6a600d1e60.jpg",
        description: "One brave soul did take a stab at translating the almost-not-quite-Latin. According to The Guardian, Jaspreet Singh Boparai undertook the challenge with the goal of making the text “precisely as incoherent in English as it is in Latin - and to make it incoherent in the same way”. As a result, “the Greek 'eu' in Latin became the French 'bien' [...] and the '-ing' ending in 'lorem ipsum' seemed best rendered by an '-iendum' in English.”"
    },
    {
        event: "Shells Basin",
        image: "https://farm9.staticflickr.com/8015/7495067468_b366013909.jpg",
        description: "One brave soul did take a stab at translating the almost-not-quite-Latin. According to The Guardian, Jaspreet Singh Boparai undertook the challenge with the goal of making the text “precisely as incoherent in English as it is in Latin - and to make it incoherent in the same way”. As a result, “the Greek 'eu' in Latin became the French 'bien' [...] and the '-ing' ending in 'lorem ipsum' seemed best rendered by an '-iendum' in English.”"
    },
    {
        event: "Paradise siting",
        image: "https://farm5.staticflickr.com/4247/34518518980_43679f6559.jpg",
        description: "One brave soul did take a stab at translating the almost-not-quite-Latin. According to The Guardian, Jaspreet Singh Boparai undertook the challenge with the goal of making the text “precisely as incoherent in English as it is in Latin - and to make it incoherent in the same way”. As a result, “the Greek 'eu' in Latin became the French 'bien' [...] and the '-ing' ending in 'lorem ipsum' seemed best rendered by an '-iendum' in English.”"
    }
    
    ];

// Remove all events    
function seedDB(){
    Dazzfun.remove({}, function(err){
      /*  if(err){
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
        
    });*/
});
}

module.exports = seedDB;