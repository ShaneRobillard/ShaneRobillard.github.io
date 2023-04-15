const userModel = require('../models/user');
const itemModel = require('../models/events');


exports.signup = (req, res)=>{
    return res.render('./story/signup');
};


exports.create = (req, res, next)=>{
    let user = new userModel(req.body);              
    user.save()                                     
    .then(user=> res.redirect('/story/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/story/signup');
        }
        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/story/signup');
        }
        next(err);
    }); 
};


exports.getUserLogin = (req, res, next) => {
    return res.render('./story/login');
}


exports.login = (req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    userModel.findOne({ email: email })
    .then(user => {
        if (!user) {
            req.flash('error', 'Wrong email address');  
            res.redirect('/story/login');
        } 
        else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/story/profile');
                } 
                else {
                    req.flash('error', 'Wrong password');      
                    res.redirect('/story/login');
                }
            });     
        }     
    })
    .catch(err => next(err)); 
};


exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([userModel.findById(id), itemModel.find({brand: id})]) 
    .then(results=>{
        const [user, trades] = results;
        res.render('./story/profile', {user, trades});
    })
    .catch(err=>next(err));
};


exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
};