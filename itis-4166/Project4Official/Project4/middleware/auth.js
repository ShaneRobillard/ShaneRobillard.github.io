const Event = require('../models/events');

exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in or do not have the privilege needed to access this feature.');
        res.redirect('/user/profile');
    }
};

exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to login first.');
        res.redirect('/user/login');
    }
};

exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    Event.findById(id)
    .then(event=>{
        if(event) {
            if(event.author == req.session.user) {
                return next();
            } else {
                let err = new Error('You are not authorized to access this event');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Can not find new event ID' + req.params.id)
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};