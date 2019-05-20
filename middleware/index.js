var Dazzfun = require("../models/dazzfun");
var Comment = require("../models/comment");
// all the middleware goes here

var middlewareObj = {};

middlewareObj.checkDazzfunOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Dazzfun.findById(req.params.id, function(err, foundDazzfun){
          if(err){
            req.flash("error", "Dazzfun Event not found");
            res.redirect("back");
          } else {
              // does user own the dazzfun?
           if (foundDazzfun.author.id.equals(req.user._id)) { // cant use comparism check === cz author.id gives an object and user._id gives  a string
              next();
           } else {
               req.flash("error", "You need to be logged in to do thadon't have permission to do that");
               res.redirect("back");
           }
          }
        });
    } else {
               req.flash("error", "You need to be logged in to do that");
               res.redirect("back");
    }
}
    
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
            res.redirect("back");
          } else {
              // does user own the comment?
           if (foundComment.author.id.equals(req.user._id)) { // cant use comparism check === cz author.id gives an object and user._id gives  a string
              next();
           } else {
               req.flash("error", "You do not have permission to do that");
               res.redirect("back");
           }
          }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};
     
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

module.exports = middlewareObj;
