var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Dazzfun    = require("./models/dazzfun"),
    Comment    = require("./models/comment"),
    User      = require("./models/user"),
    seedDB     = require("./seeds");

mongoose.connect("mongodb://localhost/dazz_fun6"); // Connect to dazz_fun database
app.use(bodyParser.urlencoded({extended: true})); // to use for getting form bbody
app.set("view engine", "ejs"); //to avoid dding (.ejs) to every route
app.use(express.static(__dirname + "/public")); // connecting script to the public directory
seedDB(); 

// PASSPORT CONFIGURATION FOR AUTHENTICATION
app.use(require("express-session")({
    secret: "Once again rusty wins context dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //.authenticate is calling from passport-local-mongoose" method
passport.serializeUser(User.serializeUser()); // from passport-local-mongoose" methods
passport.deserializeUser(User.deserializeUser()); // passport-local-mongoose" methods

// middleware that would be used on every route //using the currentUser variable in all ejs templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user; // setting currentUser to req.user
    next();
});

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX - Shows all Events
app.get("/dazzfuns", function(req, res){
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
    
    res.render("dazzfuns/new");
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
            res.render("dazzfuns/show", {dazzfun: foundDazzfun});
           
       }
    });
    
});

//====================================
// COMMENT ROUTES
//====================================

app.get("/dazzfuns/:id/comments/new" ,isLoggedIn, function(req, res) {
    // find campground by id
    Dazzfun.findById(req.params.id, function(err, dazzfun){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {dazzfun: dazzfun});
        }
    });
});

app.post("/dazzfuns/:id/comments",isLoggedIn, function(req, res){
    //lookup dazzfun using ID
    Dazzfun.findById(req.params.id, function(err, dazzfun){
        if(err){
            console.log(err);
            res.redirect("/dazzfuns");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // connect new comment to dazzfun
                    dazzfun.comments.push(comment);
                    dazzfun.save();
                    // redirect dazzfun show page
                    res.redirect('/dazzfuns/' + dazzfun.id);
                }
            });
        }
    });
});

//=============
// AUTH ROUTES  
//==============

// show register form
app.get("/register", function(req, res){
    res.render("register");
});
// handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){ //provided by passport-local library and hashing the password
        if (err){
            console.log(err.name);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/dazzfuns");
        });
    });
});
    
// Show login form
app.get("/login", function(req, res){
    res.render("login");
});

// handle Login logic
// app.post("/login", middleware, callback) implementation below
app.post("/login", passport.authenticate("local", //the localStrategy would take care of req.body.username and password
    {successRedirect: "/dazzfuns",
     failureRedirect: "/login"
    }), function(req, res){
});

// logout route
app.get("/logout", function(req, res){
    req.logout(); // logout from localStrategy methods
    res.redirect("/dazzfuns");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){ //checking if user is logged in
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
//app.listen("22", "34.241.83.52", function(){ //using my aws EC2 instance
    console.log("dazz-fun started!!!");
});