//Express router
const router = require("express").Router();

//Using the workout model for database get and put
const Workout = require("../models/workout.js");

//Post a new exercise array/entry to the database
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update an individual entry with additional information in the database; 
//for stacking individual exercises into a longer "routine" object
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get all workouts for display
router.get("/api/workouts/all", (req, res) => {
  Workout.find({})
    .then(dbWorkouts => {
      //console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

//To get a range of workouts
router.get("/api/workouts/range", ({ query }, res) => {
  Workout.find({ day: {$gte: new Date(new Date().setDate(new Date().getDate()-10)), $lte: new Date()}})
    .then(dbWorkouts => {
      console.log(dbWorkouts);
      console.log("in range");
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

//To delete an individual workout from the database
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});

//Export the router to the server
module.exports = router;