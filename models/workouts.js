// const { Int32 } = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }]   
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;


