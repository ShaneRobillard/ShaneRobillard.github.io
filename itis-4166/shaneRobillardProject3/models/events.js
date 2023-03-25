const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {type: String, required: [true, "Category is required"], 
            enum: ["Viewing Parties","Educational Classes", "Club Meetings","Workshops","Other"]},
    title: {type: String, required: [true, "Title is required"]},
    hostName: {type: String, required: [true, "HostName is required"]},
    startTime: {type: Date, required: [true, "StartTime is required"]},
    endTime: {type: Date, required: [true, "EndTime is required"]},
    location: {type: String, required: [true, "Location is required"]},
    details: {type: String, required: [true, "Details is required"]},
    image: {type: String, required: [true, "Image is required"]}
});

const event = mongoose.model('event',eventSchema);

module.exports = event;