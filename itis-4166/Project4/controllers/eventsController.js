const model = require('../models/events');
const { DateTime } = require("luxon");

exports.events = (req, res, next) => {
    let events = model.find()
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

// Helper function to retrieve distinct categories
const getDistinctCategories = () => {
    return Event.distinct('category')
        .then(categories => categories)
        .catch(error => {
            console.error(error);
            throw new Error('Error retrieving categories');
        });
};

// Controller function to retrieve all events and distinct categories
exports.index = () => {
    // Retrieve all events and format date/time fields
    return Event.find().lean()
        .then(events => {
            events.forEach(event => {
                event.start = DateTime.fromJSDate(event.start).toISO({ includeOffset: false, format: 'basic' });
                event.end = DateTime.fromJSDate(event.end).toISO({ includeOffset: false, format: 'basic' });
            });

            // Retrieve distinct categories
            return getDistinctCategories()
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
    if (req.file) {
        event.image = "/images/" + req.file.filename
    }

    event.start = new Date(event.start).toLocaleString(DateTime.DATE_SHORT);
    event.end = new Date(event.end).toLocaleString(DateTime.DATETIME_SHORT);

    // Set createdBy to the id of the logged-in user
    event.host = req.user._id; // might need to change this to createdBy

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
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
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

/* exports.event = (req, res, next) => {
    let id = req.params.id;
    let event = model.findById(id);
    if (event) {
        res.render('./events/events', { event });
    } else {
        let err = new Error('Cannot find a event with id ' + id);
        err.status = 404;
        next(err);
    }
}; */

exports.edit = (req, res, next) => {
    let event = req.body;
    let id = req.params.id;
    let image = "/images/" + req.body.image;
    event.image = image;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
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

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true }) // Possible Change delete-", runValidators: true"
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
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error("Invalid event id");
        err.status = 400;
        return next(err);
    }
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