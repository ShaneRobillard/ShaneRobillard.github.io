const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {
        type: String, required: [true, "Category is required"],
        enum: ["Looking For Team Center", "Esport Watch Party", "Meet And Greet", "Coaching", "Compete"]
    },
    title: { type: String, required: [true, "Title is required"] },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
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


/* const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const events = [
    {
        id: "1",
        category: "Looking For Team Center",
        title: "Looking for Rainbow Six Siege Team",
        host: "Joseph Minton",
        location: "Library, 3rd Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A one hour event for siege players to find new team to play with.",
        image: "/images/lfo.png",
    },
    {
        id: "2",
        category: "Looking For Team Center",
        title: "Looking for Rainbow Six Siege Team",
        host: "Joseph Minton",
        location: "Library, 3rd Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A one hour event for siege players to find new team to play with or wanting to find a sub.",
        image: "/images/lfg.png",
    },
    {
        id: "3",
        category: "Looking For Team Center",
        title: "Looking for Rainbow Six Siege Team",
        host: "Joseph Minton",
        location: "Library, 3rd Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A one hour event for siege players to find new team to play with or wanting to find a sub.",
        image: "/images/esports-team.png",
    },
    {
        id: "4",
        category: "Esports Watch Party",
        title: "Six Invitational 2023",
        host: "Joseph Minton",
        location: "Student Union, Second Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A four hour event watching the grand final between G2 and W7m.",
        image: "/images/siegeinvitational.png",
    },
    {
        id: "5",
        category: "Esports Watch Party",
        title: "EU Play Day 1",
        host: "Joseph Minton",
        location: "Student Union, Second Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A four hour event watching the EU pro teams battle each other on play day 1",
        image: "/images/EUP1.png",
    },
    {
        id: "6",
        category: "Esports Watch Party",
        title: "EU Play Day 2",
        host: "Joseph Minton",
        location: "Student Union, Second Floor",
        start: "2023-02-15T13:30",
        end: "2023-02-15T13:30",
        details: "A four hour event watching the EU pro teams battle each other on play day 2",
        image: "/images/EUP2.png",
    },
];

exports.find = function () {
    return events;
}

exports.findById = function (id) {
    return events.find(event => event.id === id);
};

exports.findById = id => events.find(event => event.id === id);
exports.save = (event) => {
    event.id = uuidv4();
    event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    events.push(Event);
};


exports.save = function (event, image) {
    event.id = uuidv4()
    event.startTime = DateTime.fromISO(event.startTime).toLocaleString(DateTime.DATETIME_MED);
    event.endTime = DateTime.fromISO(event.endTime).toLocaleString(DateTime.DATETIME_MED);
    event.image = image;
    events.push(event);
} 

exports.save = function (event) {
    event.id = uuidv4();
    events.push(event);
}

exports.updateById = (id, newEvent) => {
    let event = events.find(event => event.id === id);
    if (event) {
        event.category = newEvent.category;
        event.title = newEvent.title;
        event.host = newEvent.host;
        event.details = newEvent.details;
        event.location = newEvent.location;
        event.start = newEvent.start;
        event.end = newEvent.end;
        event.image = newEvent.image;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function (id) {
    let index = events.findIndex(event => event.id == id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
} */