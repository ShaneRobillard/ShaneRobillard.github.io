const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {
        type: String, required: [true, "Category is required"],
        enum: ["Looking For Team Center", "Esport Watch Party", "Meet And Greet", "Coaching", "Compete"]
    },
    title: { type: String, required: [true, "Title is required"] },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    start: { type: Date, required: [true, "StartTime is required"] },
    end: { type: Date, required: [true, "EndTime is required"] },
    location: { type: String, required: [true, "Location is required"] },
    details: {
        type: String, required: [true, "Details is required"],
        minLength: [10, 'the details should have at least 10 characters']
    },
    image: { type: String, required: [true, "Image is required"] }
},
    { timestamps: true }
);

const events = mongoose.model('events', eventSchema);



module.exports = events;