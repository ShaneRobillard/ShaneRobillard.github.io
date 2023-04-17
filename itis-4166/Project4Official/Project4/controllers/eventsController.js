const model = require('../models/events');
const { DateTime } = require("luxon");

exports.events = (req, res, next) => {
    model.find()
        .then(events => {
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
            res.render("./events/events", { events, categories });
        })
        .catch(err => next(err));
};

exports.newEvent = (req, res) => {
    res.render('./events/newEvent',);
};


// Controller function to retrieve all events and distinct categories
exports.index = () => {
    // Retrieve all events and format date/time fields
    model.find()
        .then(events => {
            /* events.forEach(event => {
                event.start = DateTime.fromJSDate(event.start).toISO({ includeOffset: false, format: 'basic' });
                event.end = DateTime.fromJSDate(event.end).toISO({ includeOffset: false, format: 'basic' });
            }); */

            // Retrieve distinct categories
            model.distinct('category')
                .then(categories => {
                    // Return events and categories as an object
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

exports.create = (req, res, next) => {
    let event = new model(req.body);
    let image = "/images/" + req.body.image;
    event.image = image;

    event.start = new Date(event.start).toLocaleString(DateTime.DATE_SHORT);
    event.end = new Date(event.end).toLocaleString(DateTime.DATETIME_SHORT);

    event.author = req.session.user;

    event.save() // Insert doc into database
        .then(event => res.redirect('/events'))
        .catch(err => {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            next(err);
        });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName')
        .then(events => {
            if (events) {
                const start = new Date(events.start);
                const end = new Date(events.end);
                const formattedStart = start.toLocaleString();
                const formattedEnd = end.toLocaleString();
                return res.render("./events/event", { events, formattedStart, formattedEnd });
            } else {
                let err = new Error("Cannot find an event with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
        .then(event => {
            if (event) {
                return res.render('./events/edit', { event });
            } else {
                let err = new Error('Cannot find event with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    let image = "/images/" + req.body.image;
    event.image = image;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false})
        .then(event => {
            if (event) {
                res.redirect("/event/" + id);
            } else {
                let err = new Error("Cannot find a product with id " + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') //////////// Possible change
                err.status = 400;
            next(err);
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    model.findByIdAndDelete(id, { useFindAndModify: false })
        .then(event => {
            if (event) {
                res.redirect("/events");
            } else {
                let err = new Error("Cannot find an event with id " + id);
                err.status = 404;
                return next(err);
            }
        })
        .catch(err => next(err));
};