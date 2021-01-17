//Express router
const router = require("express").Router();

//Built-in Node path to construct relative paths
const path = require("path");

//Display the general exercise page, pulling the last entry (array) of exercises
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//Display overall exercise statistics that have been entered into the database for both
//cardio and resistance exercises
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

//Export for use by the server
module.exports = router;