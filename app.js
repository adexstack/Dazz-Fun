var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Dazzfun    = require("./models/dazzfun"),
    methodOverride = require("method-override"),
    flash      = require("connect-flash"),
    Comment    = require("./models/comment"),
    User      = require("./models/user"),
    seedDB     = require("./seeds");
    
// requiring routes   
var commentRoutes = require("./routes/comments"),
     dazzfunRoutes = require("./routes/dazzfuns"),
     indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/dazz_fun6", { useNewUrlParser: true }); // Connect to dazz_fun database
app.use(bodyParser.urlencoded({extended: true})); // to use for getting form bbody
app.set("view engine", "ejs"); //to avoid dding (.ejs) to every route
app.use(express.static(__dirname + "/public")); // connecting script to the public directory and __dirname is the current directory
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); 

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
    res.locals.currentUser = req.user // setting currentUser to req.user
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/dazzfuns", dazzfunRoutes);
app.use("/dazzfuns/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
//app.listen("22", "34.241.83.52", function(){ //using my aws EC2 instance
    console.log("dazz-fun server has started!!!");
});