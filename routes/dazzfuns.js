var express = require("express"),
    router = express.Router(),
    Dazzfun = require("../models/dazzfun");

//INDEX - Shows all Events
router.get("/", function(req, res){
    console.log(req.user);
    // Get all dazzfuns from DB
    Dazzfun.find({}, function(err, allDazzfuns){
        if(err){
            console.log(err);
        } else {
            res.render("dazzfuns/index", {dazzfuns:allDazzfuns}); 
        }
    });
});

//CREATE - add new dazzfun to DB
// get data from form and add to moments array
// redirect back to get /moments and show all moments (following REST concept)
router.post("/", function(req, res){
    var event = req.body.event;
    var image = req.body.image;
    var description = req.body.description;
    var newDazzfun = {event: event, image:image, description:description};
    // Create a new campground and save to database
    Dazzfun.create(newDazzfun, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/dazzfuns"); // redirects back to dazzfuns page
        }
    
});
});

//NEW - show form to create new event
// shows form for adding new dazzfun and posts the added dazzfun to POST /dazzfuns
router.get("/new", function(req, res){
    
    res.render("dazzfuns/new");
});

//SHOW route - show more details about a dazzfun event. Note that it is at the buttom so it doesnt override similar matching route
router.get("/:id", function(req, res){
    // find the event with provided ID
    Dazzfun.findById(req.params.id).populate("comments").exec(function(err, foundDazzfun){
       if(err){
           console.log(err);
       }  else {
           console.log(foundDazzfun)
            // render show template with that particular event
            res.render("dazzfuns/show", {dazzfun: foundDazzfun});
           
       }
    });
    
});

module.exports = router;