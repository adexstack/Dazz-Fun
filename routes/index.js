var express = require("express"),
    router = express.Router({mergeParams: true}),
    passport = require("passport"),
    User = require("../models/user"),
    Dazzfun = require("../models/dazzfun");

router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res){
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
router.get("/login", function(req, res){
    res.render("login");
});

// handle Login logic
// router.post("/login", middleware, callback) implementation below
router.post("/login", passport.authenticate("local", //the localStrategy would take care of req.body.username and password
    {successRedirect: "/dazzfuns",
     failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout(); // logout from localStrategy methods
    res.redirect("/dazzfuns");
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){ //checking if user is logged in
        return next();
    }
    res.redirect("/login");
}

module.exports = router;