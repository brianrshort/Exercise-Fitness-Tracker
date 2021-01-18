//Express for the server
const express = require("express");

//Morgan to log color-coded request/put/get info to the termal
const logger = require("morgan");

//Mongoose ODM for MongoDB
const mongoose = require("mongoose");

//Our port info
const PORT = process.env.PORT || 3000;

//Express for server
const app = express();

//Setting 'dev' settings for Morgan
app.use(logger("dev"));

//To parse incoming requests with URLs
app.use(express.urlencoded({ extended: true }));

//To parse incoming JSON requests
app.use(express.json());

//Sets the 'public' folder as the static folder, for relative paths in code esp. js files
app.use(express.static("public"));

//Uniform Resource Identifier info for Mongoose.connect
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


//Routes for API and HTML web pages
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

//Start our server
app.listen(PORT, () => {
  console.log(`Is your app running on Port ${PORT}? Then you better go catch it!`);
});


