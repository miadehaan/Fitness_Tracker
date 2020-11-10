const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

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


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});


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

// Get Last Workout
// app.get("/api/workouts", (req,res) => {
  // db.Workout.find({  })
  // .populate("workouts")
  // .then(dbWorkouts => {
  //   console.log(dbWorkouts);

  //   res.json(dbWorkouts);
  // })
  // .catch(err => {
  //   res.json(err);
  // });
  
// });


// Add exercises for NEW workout plan 
// PUT: /api/workouts/:id
app.put("/api/workouts/:id", ({body}, res) => {
  console.log(body.type); // form information
  let data = "";
  if (body.type === "cardio") {
    data = "cardio";
  } else if (body.type === "resistance") {
    data = "resistance";
  }

  db.Workout.insert(data)
    .then(dbExercises => {
      console.log(dbExercises);

      res.json(dbExercises);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Create new Workout from exercises that were added
app.post("/api/workouts", ({body}, res) => {

  // db.Workout.create(body)
  // .then(dbWorkouts => {
  //   console.log(dbWorkouts);

  //   res.json(dbWorkouts);
  // })
  // .catch(err => {
  //   res.status(400).json(err);
  // });

});


// View the combined weight of multiple exercises on the `stats` page.
// GET: /api/workouts/range
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .populate("workouts")
  .then(dbWorkouts => {
    console.log(dbWorkouts);

    res.json(dbWorkouts);
  })
  .catch(err => {
    res.json(err);
  });
});




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
