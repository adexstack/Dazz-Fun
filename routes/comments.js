var express = require("express"),
     router = express.Router({mergeParams: true}), //adding this option to tie up the compground id with a comment
     Dazzfun = require("../models/dazzfun"),
     Comment = require("../models/comment");

// Comments New
router.get("/new" ,isLoggedIn, function(req, res) {
    // lookup dazzfuns using ID
    Dazzfun.findById(req.params.id, function(err, dazzfun){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {dazzfun: dazzfun});
        }
    });
});

// Comments Create
router.post("/",isLoggedIn, function(req, res){
    //lookup dazzfuns using ID
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

//Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){ //checking if user is logged in
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
