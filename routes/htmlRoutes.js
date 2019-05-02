const router = require("express").Router();
const path = require("path");

// Render notes.html at the "/notes" path
router.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// All other paths serve the index.html page
router.get("*", function (req, res) {
  res.sendFile(path.joing(__dirname, "../public/index.html"));
});

module.exports = router;