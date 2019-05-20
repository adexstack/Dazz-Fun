var express = require("express"),
    router = express.Router(),
    Dazzfun = require("../models/dazzfun"),
    middleware = require("../middleware"), // index.js is required by default so not need to be added as /index.js
    NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

//INDEX - Shows all Events
router.get("/", function(req, res){
    // Get all dazzfuns from DB
    Dazzfun.find({}, function(err, allDazzfuns){
        if(err){
            console.log(err);
        } else {
            res.render("dazzfuns/index", {dazzfuns: allDazzfuns, page: 'dazzfuns'}); 
        }
    });
});

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = (today.getHours()+1) + ":" + today.getMinutes();
//var dateTime = date+' '+time;

//CREATE - add new dazzfun to DB
// get data from form and add to moments array
// redirect back to get /moments and show all moments (following REST concept)
router.post("/", middleware.isLoggedIn, function(req, res){
    var event = req.body.event;
    var dateTime = date+' '+time;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      console.log(err);
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newDazzfun = {event: event, dateTime: dateTime, image:image, description:description, author:author, location: location, lat: lat, lng: lng};
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

// Update Dazzfun Route
router.put("/:id", middleware.checkDazzfunOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.dazzfun.lat = data[0].latitude;
    req.body.dazzfun.lng = data[0].longitude;
    req.body.dazzfun.location = data[0].formattedAddress;
    //find and update the correct dazzfun event
    Dazzfun.findByIdAndUpdate(req.params.id, req.body.dazzfun, function(err, dazzfun){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            //redirect to the show page
            req.flash("success","Successfully Updated!");
            res.redirect("/dazzfuns/" + dazzfun._id);
        }
    });
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