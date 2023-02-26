const { v4: uuidv4 } = require('uuid');
const { DateTime } = require("luxon");
const { fileUpload } = require('../middleware/fileUpload');
const events = [
{
    id: '1',
    category: 'Viewing Parties',
    title: 'Meteor Showers',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 22, 18).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 22, 23).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Observatory',
    details: 'Come and join us in watching the Lyrids Meteor Showers.',
    image: '/images/meteorshower.jpg'
},
{
    id: '2',
    category: 'Viewing Parties',
    title: 'Meeting at the Observatory',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 21, 18).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 21, 23).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Observatory',
    details: 'Join us as we use the Observatory to peer into the heavens.',
    image: '/images/observatory.jpg'
},
{
    id: '3',
    category: 'Viewing Parties',
    title: 'Star Parties for Beginners',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 20, 18).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 20, 23).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Observatory',
    details: 'This party is for newcomers to socialize and learn from our more experienced members. ',
    image: '/images/starparty.jpg'
},
{
    id: '4',
    category: 'Educational Classes',
    title: 'The Science of Space Telescopes',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 22, 15).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 22, 17).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Classroom',
    details: 'This class is for beginners to learn about how telescopes work.',
    image: '/images/telescope.jpg'
},
{
    id: '5',
    category: 'Educational Classes',
    title: 'Buying A Telescope',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 21, 15).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 22, 17).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Classroom',
    details: 'This class is designed to educate about what telescopes are out there to buy.',
    image: '/images/buyingtelescope.jpg'
},
{
    id: '6',
    category: 'Educational Classes',
    title: 'Reading a Star Atlas',
    hostName: 'Blue Wolf',
    startTime: DateTime.local(2023, 4, 20, 15).toLocaleString(DateTime.DATETIME_MED),
    endTime: DateTime.local(2023, 4, 20, 17).toLocaleString(DateTime.DATETIME_MED),
    location: 'Blue Wolf Classroom',
    details: 'This class is for those who wish to learn about the different types of star atlases, and how to read them.',
    image: '/images/staratlas.jpg'
},
];

exports.find = function(){
    return events;
}

exports.findById = function(id) {
    return events.find(story=>story.id === id);
};

exports.save = function(event, image){
    event.id = uuidv4();
    event.startTime = DateTime.fromISO(event.startTime).toLocaleString(DateTime.DATETIME_MED);
    event.endTime = DateTime.fromISO(event.endTime).toLocaleString(DateTime.DATETIME_MED);
    event.image = image;
    events.push(event);
};

exports.updateById = function(id, image, newEvent){
    let event = events.find(event=>event.id === id);
    if(event){
        event.title = newEvent.title;
        event.category = newEvent.category;
        event.hostName = newEvent.hostName;
        event.startTime = DateTime.fromISO(newEvent.startTime).toLocaleString(DateTime.DATETIME_MED);
        event.endTime = DateTime.fromISO(newEvent.endTime).toLocaleString(DateTime.DATETIME_MED);
        event.location = newEvent.location;
        event.details = newEvent.details;
        event.image = image;
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = events.findIndex(event=>event.id === id);
    if(index !== -1) {
        events.splice(index, 1);
        return true;
    } else {
        return false;
    }
};