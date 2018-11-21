var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")
    
mongoose.connect("mongodb://localhost/dazz_fun"); // Connect to dazz_fun database

// Shema Setup
var dazzfunSchema = new mongoose.Schema({
    event: String,
    image: String
    
});

// Compiling the schema into a model

 var Dazzfun = mongoose.model("Dazzfun", dazzfunSchema);

// Dazzfun.create(
//     {
//         event: "Fun out", 
//         image: "https://farm8.staticflickr.com/7407/9647405948_b2bcd3ab57.jpg"
        
//     }, function(err, dazzfun){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly Created dazzfun: ");
//             console.log(dazzfun);
//         }
//     });


app.use(bodyParser.urlencoded({extended: true})); // to use for getting form bbody
app.set("view engine", "ejs"); //to avoid dding (.ejs) to every route

app.get("/", function(req, res){
    res.render("landing");
});

// show all moments
app.get("/dazzfuns", function(req, res){
    // Get all dazzfuns from DB
    Dazzfun.find({}, function(err, allDazzfuns){
        if(err){
            console.log(err);
        } else {
            res.render("dazzfuns", {dazzfuns:allDazzfuns});
        }
    });
});

// get data from form and add to moments array
// redirect back to get /moments and show all moments (following REST concept)
app.post("/dazzfuns", function(req, res){
    var event = req.body.event;
    var image = req.body.image;
    var newDazzfun = {event: event, image:image};
    // Create a new campground and save to database
    Dazzfun.create(newDazzfun, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/dazzfuns"); // redirects back to dazzfuns page
        }
    
});
});

// shows form for adding new moment and posts the added moment to POST /moment
app.get("/dazzfuns/new", function(req, res){
    
    res.render("new");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("dazz-fun started!!!");
});