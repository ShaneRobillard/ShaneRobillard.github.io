const Item = require('../models/user');

exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/story/profile');
    }
}

exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    } else {
        req.flash('error', 'You need to log in first');
        return res.redirect('/story/login');
    }
}

exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;
    Item.findById(id)
    .then(item=>{
        if(item) {
            if(item.brand == req.session.user) {
                return next();
            } else {
                let err = new Error('You are not authorized to access this event');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};