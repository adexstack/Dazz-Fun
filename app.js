var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Dazzfun    = require("./models/dazzfun"),
    seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/dazz_fun3"); // Connect to dazz_fun database
app.use(bodyParser.urlencoded({extended: true})); // to use for getting form bbody
app.set("view engine", "ejs"); //to avoid dding (.ejs) to every route
seedDB(); 

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Shows all Events
app.get("/dazzfuns", function(req, res){
    // Get all dazzfuns from DB
    Dazzfun.find({}, function(err, allDazzfuns){
        if(err){
            console.log(err);
        } else {
            res.render("index", {dazzfuns:allDazzfuns});
        }
    });
});

//CREATE - add new dazzfun to DB
// get data from form and add to moments array
// redirect back to get /moments and show all moments (following REST concept)
app.post("/dazzfuns", function(req, res){
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
app.get("/dazzfuns/new", function(req, res){
    
    res.render("new");
});

//SHOW route - show more details about a dazzfun event. Note that it is at the buttom so it doesnt override similar matching route
app.get("/dazzfuns/:id", function(req, res){
    // find the event with provided ID
    Dazzfun.findById(req.params.id).populate("comments").exec(function(err, foundDazzfun){
       if(err){
           console.log(err);
       }  else {
           console.log(foundDazzfun)
            // render show template with that particular event
            res.render("show", {dazzfun: foundDazzfun});
           
       }
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("dazz-fun started!!!");
});