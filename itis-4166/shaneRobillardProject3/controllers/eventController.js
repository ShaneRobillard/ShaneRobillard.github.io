const model = require('../models/events')
const { DateTime } = require("luxon");
const { fileUpload } = require('../middleware/fileUpload');
const {mongoose} = require('mongoose');

const getDistinctCategories = () => {
    return Event.distinct('category')
      .then(categories => categories)
      .catch(error => {
        console.error(error);
        throw new Error('Error retrieving categories');
      });
  };

exports.index = () => {
    return Event.find().lean()
      .then(events => {
        events.forEach(event => {
          event.startTime = DateTime.fromJSDate(event.startTime).toISO({includeOffset: false, format: 'basic'});
          event.endTime = DateTime.fromJSDate(event.endTime).toISO({includeOffset: false, format: 'basic'});
        });
        return getDistinctCategories()
          .then(categories => {
            return { events, categories };
          })
          .catch(error => {
            console.error(error);
            throw new Error('Error retrieving categories');
          });
      })
      .catch(error => {
        console.error(error);
        throw new Error('Error retrieving events');
      });
  };

exports.events = (req, res, next) => {
    let events = model.find()
    .then(events=>{
        const categories = {};
        events.forEach((event) => {
            if (event.category in categories) {
                const events = categories[event.category];
                events.push(event);
                categories[event.category] = events;
            }
            else {
                const event = [];
                event.push(event);
                categories[event.category] = event;
            }
        });
        res.render("./story/events", {events, categories});
    }) 
    .catch(err=>next(err));
};

exports.newEvent = (req,res)=>{
    res.render('./story/newEvent');
};

exports.create = (req,res,next)=>{
    let event = new model(req.body);
    let image = "/images/" + req.body.image;
    event.image = image;
    event.startTime = new Date(event.startTime).toLocaleString(DateTime.DATETIME_MED);
    event.endTime = new Date(event.endTime).toLocaleString(DateTime.DATETIME_MED);
    event.save()
    .then(event=>res.redirect('/events'))
    .catch(err=> {
        if(err.name==="ValidationError"){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(events=>{
        if(events) {
            const startTime = new Date(events.startTime);
            const endTime = new Date(events.endTime);
            const formattedStart = startTime.toLocaleString();
            const formattedEnd = endTime.toLocaleString();
            return res.render('./story/event',{events, formattedStart, formattedEnd});        
        } else {
            let err = new Error("Cannot find an event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    let image = "/images/" + req.body.image;
    event.image = image;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(event=>{
        if(event) {
            return res.render("./story/edit", {event});
        } else {
            let err = new Error("Cannot find an event with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;
    let image = "/images/" + req.body.image;
    event.image = image;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, event, {useFindAndModify: false})
    .then(event =>{
        if (event) {
            res.redirect("/event/" + id);
        } else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event=>{
        if(event) {
            res.redirect("/events");
        } else {
            let err = new Error("Cannot find an event with id " + id);
            err.status = 404;
            return next(err);
        }
    })    
    .catch(err=>next(err));
};