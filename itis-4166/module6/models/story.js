const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const stories = [
{
    id: '1',
    title: 'My life at Charlotte',
    content: 'My life at Charlotte has been a short one. I love the university and what it has to teach me. I have tried learning to the best of my ability.',
    author: 'Shane Robillard',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'2',
    title: 'Learning NBAD',
    content: 'NBAD is an acronym. It stands for something.',
    author: 'Shane Robillard',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id:'3',
    title: 'My Spring Break',
    content: 'My spring break is going to be spent with my kids. I dont plan on going anywhere at this time.',
    author: 'Shane Robillard',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
}
];

exports.find = function(){
    return stories;
}

exports.findById = function(id) {
    return stories.find(story=>story.id === id);
};

exports.save = function(story){
    story.id = uuidv4();
    story.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
};

exports.updateById = function(id, newStory){
    let story = stories.find(story=>story.id === id);
    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id) {
    let index = stories.findIndex(story=>story.id === id);
    if(index !== -1) {
        stories.splice(index, 1);
        return true;
    } else {
        return false;
    }
};