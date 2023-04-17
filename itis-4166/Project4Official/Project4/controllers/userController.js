const model = require('../models/user');
const eventModel = require('../models/events');

exports.new = (req, res) => {
    res.render('./user/new');
};

exports.create = (req, res) => {
    let user = new model(req.body);
    user.save()
    .then(user=> res.redirect('/user/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/user/new');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/user/new');
        }
        next(err);
    }); 
};

// renders the login page
exports.userLogin = (req, res, next) => {
    return res.render('./user/login');
};

//Handles post request for logging in
exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email})
        .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            res.redirect('/user/login');
        } 
        else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.session.name = user.firstName
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/user/profile');
                } 
                else {
                    req.flash('error', 'Wrong password');      
                    res.redirect('/user/login');
                }
            });     
        }     
    })
    .catch(err => next(err)); 
};

exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), eventModel.find({author: id})]) 
    .then(results=>{
        const [user, events] = results;
        res.render('./user/profile', {user, events});
    })
    .catch(err=>next(err));
};


//Handles logout request
exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    })
};