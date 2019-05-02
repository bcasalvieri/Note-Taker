const router = require("express").Router();
const connection = require("../db/connection");

// Retrieve all notes from the database and return them as JSON
router.get("/api/notes", function (req, res) {
  connection.query("SELECT * FROM notes", function (err, dbNotes) {
    if (err) throw err;
    res.json(dbNotes);
  });
});

// Save a new note to database using the data passed in req.body
router.post("/api/notes", function (req, res) {
  connection.query("INSERT INTO notes SET ?", req.body, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a note from the database using id
// router.delete("/api/notes", function (req, res) {
//   connection.query("DELETE FROM notes WHERE ?", )
// });

module.exports = router;