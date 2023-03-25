const model = require('../models/events');
const { DateTime } = require("luxon");
const { fileUpload } = require('../middleware/fileUpload');


exports.events = (req, res) => {
    let events = model.find();
    let rainbowMap = events.map(event => event.category);
    let categories = rainbowMap.filter((c, index) => {
        return rainbowMap.indexOf(c) === index;
    });
    res.render("./events/events", { events, categories });
};

exports.newEvent = (req, res) => {
    res.render('./events/newEvent',);
};

exports.index = (req, res) => {
    let events = model.find();
    res.render('./events/index'); //possible edit to ./events/event (don't think it matters)
};

exports.create = (req, res) => {
    let event = req.body;
    let image = "/images/" + req.file.filename;
    event.image = image;

    event.start = new Date(event.start).toLocaleString(DateTime.DATE_SHORT);
    event.end = new Date(event.end).toLocaleString(DateTime.DATETIME_SHORT);

    model.save(event);
    res.redirect('/events');
    console.log(event);
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./events/event', { event });
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.event = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./events/event', { event });
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./events/edit', { event });
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
};

/* exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    if (model.updateById(id, event)) {
        res.redirect("/events/" + id);
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    };
}; */

exports.update = (req, res, next) => {
    let event = req.body;
    console.log(event);
    let id = req.params.id;
    console.log(req)
    let image = "/images/" + req.file.filename;
    event.image = image;

    event.start = new Date(event.start).toLocaleString(DateTime.DATE_SHORT);
    event.end = new Date(event.end).toLocaleString(DateTime.DATETIME_SHORT);

    if (model.updateById(id, event)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find an event with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    // res.send('update story with id ' + req.params.id);
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/events');
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    };
};
