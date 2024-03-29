const userModel = require('../models/user');
const eventModel = require('../models/events');


exports.signup = (req, res)=>{
    return res.render('./users/signup');
};

exports.create = (req, res, next)=>{
    let user = new userModel(req.body);              
    user.save()                                     
    .then(user=> res.redirect('/users/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/signup');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/users/signup');
        }
        next(err);
    }); 
};

exports.getUserLogin = (req, res, next) => {
    return res.render('./users/login');
}

exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    userModel.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            res.redirect('/users/login');
        } 
        else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.session.name = user.firstName
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
                } 
                else {
                    req.flash('error', 'Wrong password');      
                    res.redirect('/users/login');
                }
            });     
        }     
    })
    .catch(err => next(err)); 
};


exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([userModel.findById(id), eventModel.find({author: id})]) 
    .then(results=>{
        const [user, events] = results;
        res.render('./users/profile', {user, events});
    })
    .catch(err=>next(err));
};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else{
            res.redirect('/');  
       }
    });
};