const express = require("express");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "fitnesstracker";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

// Routes -------------------------------------------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

// Create new exercises to a new workout plan/DB collection
app.get("/api/workouts", (req,res) => {
  db.notes.insert(req.body, (err, data) => {
    console.log(req.body); // pulls info from input form on browser

    if (err){
      throw err;
    } 

    // console.log(data);
    res.send(data); 
  });
});

// Add exercises to a previous workout plan.

// View the combined weight of multiple exercises on the `stats` page.
// GET: /all
app.get("/all", (req, res) => {
  db.notes.find({}, (err, data) => {
    if(err) {
      throw err;
    }

    // console.log(data); // Should show all data
    res.json(data);

  });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
