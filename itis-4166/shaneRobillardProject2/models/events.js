const { v4: uuidv4 } = require('uuid');
const events = [
{
    id: '1',
    category: 'Viewing Parties',
    title: 'Meteor Showers',
    hostName: 'Blue Wolf',
    startTime: 'April 22nd, 2023, 6pm',
    endTime: 'April 22nd, 2023, 11pm',
    location: 'Blue Wolf Observatory',
    details: 'Come and join us in watching the Lyrids Meteor Showers.',
    image: img.src='../../public/images/meteorshower.jpg'
},
{
    id: '2',
    category: 'Viewing Parties',
    title: 'Meeting at the Observatory',
    hostName: 'Blue Wolf',
    startTime: 'April 21st, 2023, 6pm',
    endTime: 'April 21st, 2023, 11pm',
    location: 'Blue Wolf Observatory',
    details: 'Join us as we use the Observatory to peer into the heavens.',
    image: img.src='../../public/images/observatory.jpg'
},
{
    id: '3',
    category: 'Viewing Parties',
    title: 'Star Parties for Beginners',
    hostName: 'Blue Wolf',
    startTime: 'April 20th, 2023, 6pm',
    endTime: 'April 20th, 2023, 11pm',
    location: 'Blue Wolf Observatory',
    details: 'This party is for newcomers to socialize and learn from our more experienced members. ',
    image: img.src='../../public/images/starparty.jpg'
},
{
    id: '4',
    category: 'Educational Classes',
    title: 'The Science of Space Telescopes',
    hostName: 'Blue Wolf',
    startTime: 'April 22nd, 2023, 3pm',
    endTime: 'April 22nd, 2023, 5pm',
    location: 'Blue Wolf Classroom',
    details: 'This class is for beginners to learn about how telescopes work.',
    image: img.src='../../public/images/telescope.jpg'
},
{
    id: '5',
    category: 'Educational Classes',
    title: 'Buying A Telescope',
    hostName: 'Blue Wolf',
    startTime: 'April 21st, 2023, 3pm',
    endTime: 'April 21st, 2023, 5pm',
    location: 'Blue Wolf Classroom',
    details: 'This class is designed to educate about what telescopes are out there to buy.',
    image: img.src='../../public/images/buyingtelescope.jpg'
},
{
    id: '6',
    category: 'Educational Classes',
    title: 'Reading a Star Atlas',
    hostName: 'Blue Wolf',
    startTime: 'April 20th, 2023, 3pm',
    endTime: 'April 20th, 2023, 5pm',
    location: 'Blue Wolf Classroom',
    details: 'This class is for those who wish to learn about the different types of star atlases, and how to read them.',
    image: img.src='../../public/images/staratlas.jpg'
},
];

exports.find = function(){
    return events;
}

exports.findById = function(id) {
    return events.find(story=>story.id === id);
};

exports.save = function(event){
    event.id = uuidv4();
    //event.image = img.src;
    events.push(event);
};

exports.updateById = function(id, newEvent){
    let event = events.find(event=>event.id === id);
    if(event){
        event.title = newEvent.title;
        event.hostName = newEvent.hostName;
        event.startTime = newEvent.startTime;
        event.endTime = newEvent.endTime;
        event.location = newEvent.location;
        event.details = newEvent.details;
        //event.image = newEvent.image;
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