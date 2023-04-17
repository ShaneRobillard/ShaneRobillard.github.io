const model = require('../models/events');

exports.index = (req, res) => {
    res.render('./events/index');
};

exports.about = (req, res) => {
    res.render('./events/about');
}

exports.contact = (req, res) => {
    res.render('./events/contact');
}