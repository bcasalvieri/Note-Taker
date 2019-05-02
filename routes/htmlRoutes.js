const router = require("express").Router();
const path = require("path");

// All other paths serve the index.html page
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;