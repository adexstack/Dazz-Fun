var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var moments = [
        {event: "First Walk", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {event: "Fun out", image: "https://farm8.staticflickr.com/7407/9647405948_b2bcd3ab57.jpg"},
        {event: "Fun out", image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
        {event: "First Walk", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {event: "Fun out", image: "https://farm8.staticflickr.com/7407/9647405948_b2bcd3ab57.jpg"},
        {event: "Fun out", image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
        {event: "First Walk", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {event: "Fun out", image: "https://farm8.staticflickr.com/7407/9647405948_b2bcd3ab57.jpg"},
        {event: "Fun out", image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"},
        {event: "First Walk", image: "https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg"},
        {event: "Fun out", image: "https://farm8.staticflickr.com/7407/9647405948_b2bcd3ab57.jpg"},
        {event: "Fun out", image: "https://farm7.staticflickr.com/6188/6208181463_40c4fd7049.jpg"}
    ];

app.use(bodyParser.urlencoded({extended: true})); // to use for getting form bbody
app.set("view engine", "ejs"); //to avoid dding (.ejs) to every route

app.get("/", function(req, res){
    res.render("landing");
});

// show all moments
app.get("/moments", function(req, res){
    
    res.render("moments", {moments:moments});
});

// get data from form and add to moments array
// redirect back to get /moments and show all moments (following REST concept)
app.post("/moments", function(req, res){
    var event = req.body.event;
    var image = req.body.image;
    var newMoment = {event: event, image:image};
    moments.push(newMoment);
    res.redirect("/moments"); // redirect to get /moments page
});

// shows form for adding new moment and posts the added moment to POST /moment
app.get("/moments/new", function(req, res){
    res.render("new");
});




app.listen(process.env.PORT, process.env.IP, function(){
    console.log("dazz-fun started!!!");
});