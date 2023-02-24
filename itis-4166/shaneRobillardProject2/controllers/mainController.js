const model = require('../models/events')

exports.index = (req,res)=>{
    res.render('./story/index');
};

exports.about = (req,res)=>{
    res.render('./story/about');
};

exports.contact = (req,res)=>{
    res.render('./story/contact');
};