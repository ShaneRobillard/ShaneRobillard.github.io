const model = require('../models/events')

exports.events = (req,res) => {
    let events = model.find(); 
    let catMap = events.map(event => event.category);
    let categories = catMap.filter((c, index) => {
        return catMap.indexOf(c) === index;
    });
    res.render('./story/events', {events, categories});
};

exports.newEvent = (req,res)=>{
    res.render('./story/newEvent');
};

exports.index = (req,res)=>{
    res.render('./story/events');
};

exports.create = (req,res)=>{
    let event = req.body;
    model.save(event);
    res.redirect('/events');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./story/event', {event});
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let event = model.findById(id);
    if(event) {
        res.render('./story/edit', {event});
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    if (model.updateById(id, event)) {
        res.redirect('/event/'+id);
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};