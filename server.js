const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Initialize an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configure the express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));

// Sets up route middleware
// Use the apiRoutes file for any apiRoutes
// Use the htmlRoutes file for all other routes
app.use(apiRoutes);
app.use(htmlRoutes);

// Start the app on port 3000 and log a message
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});