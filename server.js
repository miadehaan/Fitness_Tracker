const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// const databaseUrl = "workout";
// const collections = ["workouts"];
// const db = mongojs(databaseUrl, collections);
// db.on("error", error => {
//   console.log("Database Error:", error);
// });


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);


// Routes -------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

// Create new Workout from exercises that were added
app.post("/api/workouts", ({body}, res) => {

  db.Workout.create(body)
  .then(dbWorkouts => {
    console.log(dbWorkouts);
    res.json(dbWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });

});

// Get Last Workout
app.get("/api/workouts", (req,res) => {
  db.Workout.find({  })
  .populate("workouts")
  .then(dbWorkouts => {
    console.log(dbWorkouts);

    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
  
});


// Add exercises for NEW workout plan 
// PUT: /api/workouts/:id
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate({_id: req.params.id}, {
    $set: {
      exercises: req.body 
    }
  }).then(function(dbWorkout){
    res.json(dbWorkout); 
  }).catch(err => {
    res.status(400).json(err);
  });
});


// View the combined weight of multiple exercises on the `stats` page.
// GET: /api/workouts/range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .sort({ day: -1 })
  .then(dbWorkouts => {
    // console.log(dbWorkouts);

    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
});




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
