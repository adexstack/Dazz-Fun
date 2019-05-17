var express = require("express"),
    router = express.Router(),
    Dazzfun = require("../models/dazzfun"),
    middleware = require("../middleware"); // index.js is required by default so not need to be added as /index.js

//INDEX - Shows all Events
router.get("/", function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    var event = req.body.event;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newDazzfun = {event: event, image:image, description:description, author:author};
    // Create a new dazzfun event and save to database
    Dazzfun.create(newDazzfun, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/dazzfuns"); // redirects back to dazzfuns page
        }
    
});
});

//NEW - show form to create new event
// shows form for adding new dazzfun and posts the added dazzfun to POST /dazzfuns
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// Edit Dazzfun Route
router.get("/:id/edit", middleware.checkDazzfunOwnership, function(req, res) {
    Dazzfun.findById(req.params.id, function(err, foundDazzfun){
        if(err){
            req.flash("error", "You do not have permission to do that");
        } else {
            res.render("dazzfuns/edit", {dazzfun: foundDazzfun});
        }
    });
 });

// Update Route
router.put("/:id", middleware.checkDazzfunOwnership, function(req, res){
    //find and update the correct dazzfun event
    Dazzfun.findByIdAndUpdate(req.params.id, req.body.dazzfun, function(err, updatedDazzfun){
        if(err){
            res.redirect("/dazzfuns");
        } else {
            //redirect to the show page
            res.redirect("/dazzfuns/" + req.params.id);
        }
    });
});

// Destroy Dazzfun Route
router.delete("/:id", middleware.checkDazzfunOwnership, function(req, res){
    //find and delete the found dazzfun event
    Dazzfun.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/dazzfuns");
        } else {
            res.redirect("/dazzfuns");
        }
            });
});

module.exports = router;