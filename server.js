const express = require("express");
const connection = require("./db/connection");

// Initialize an express app
const app = express();
const PORT = 3000;

// Configure the express app to accept JSON from the client
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


// Start the app on port 3000 and log a message
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});