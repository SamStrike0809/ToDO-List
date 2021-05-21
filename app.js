//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));


//to use static css and image files in server
app.use(express.static("public"));


//to connect to db
mongoose.connect("mongodb://localhost:27017/todolostDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//cretaing a schema for a object in db
const itemSchema = {
  name: String
};


//creating a model for db
const Item = mongoose.model("Item", itemSchema);

//creating items in db collection
const item1 = new Item({
  name: "task1"
});
const item2 = new Item({
  name: "task2"
});
const item3 = new Item({
  name: "task3"
});
const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successful");
  }
})

app.get("/", function(req, res) {

  var today = new Date();
  var currentDay = today.getDay();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    newItem: defaultItems.find((item) => {
      item.name
    })
  });

  //Send Function which is necessary
  res.send();
});

//Post Function
app.post("/", function(req, res) {
  var item = req.body.item;
  items.push(item);
  console.log(item);
  res.redirect("/");
});

//Listening on 5000
app.listen(5000, function(req, res) {
  console.log("Server started on port: 5000");
});