const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [{
            type: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number,
        }]
    }
    // ,
    // {
    //     toJSON: {
    //     virtuals: true,
    //     }
    // }
);

// WorkoutSchema.virtual("totalDuration").get(function () {
//     let totalDuration = 0;
//     for (i = 0; i < this.exercises.length; i++) {
//         totalDuration += this.exercises[i].duration;
//     }
// return totalDuration;
// });

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;


