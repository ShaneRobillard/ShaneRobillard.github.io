const model = require('../models/events')
const { DateTime } = require("luxon");
const { fileUpload } = require('../middleware/fileUpload');
const {mongoose} = require('mongoose');

exports.index = (req, res, next) => {
    model.find()
      .then(events => {
        /* events.forEach(event => {
          event.startTime = DateTime.fromJSDate(event.startTime).toISO({includeOffset: false, format: 'basic'});
          event.endTime = DateTime.fromJSDate(event.endTime).toISO({includeOffset: false, format: 'basic'});
        }); */
        model.distinct('category')
        .then(categories =>{
            res.render('./story/events', {events, categories});
        })
        .catch(error => {
            console.error(error);
            throw new Error('Error retrieving categories');
        });
       /*  return getDistinctCategories()
          .then(categories => {
            return { events, categories };
          })
          .catch(error => {
            console.error(error);
            throw new Error('Error retrieving categories');
          }); */
      })
      .catch(error => {
        console.error(error);
        throw new Error('Error retrieving events');
      });
  };

exports.events = (req, res, next) => {
    let userId = req.session.user._id;
    model.find({ author: userId }).then(events=>{
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
    event.author = req.session.user;
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
    model.findById(id).populate('author', 'firstName')
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
    let id = req.params.id;
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