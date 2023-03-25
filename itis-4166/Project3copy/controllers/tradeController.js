const model = require("../models/item");

exports.trades = (req, res, next) => {
    model.find()
    .then(trades=>{
        const categories = {};
        trades.forEach((trade) => {
            if (trade.category in categories) {
                const values = categories[trade.category];
                values.push(trade);
                categories[trade.category] = values;
            }
            else {
                const value = [];
                value.push(trade);
                categories[trade.category] = value;
            }
        });
        res.render("./trade/trades", {categories});
    }) 
    .catch(err=>next(err));
};

exports.new = (req, res) =>{
    res.render("./trade/newTrade");
};

exports.create = (req, res, next) =>{
    let trade = new model(req.body);
    let price = trade.price.toFixed(2);
    trade.img = "/public/images_folder/item_4.jpg";
    trade.price = price;
    trade.save()
    .then(trade=>res.redirect("/trades"))
    .catch(err=> {
        if(err.name==="ValidationError"){
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(trade=>{
        if(trade) {
            let d = trade.createdAt;
            let date = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric',  year: 'numeric'})
            let time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short'})
            let postDate = date + ' at ' + time;
            return res.render("./trade/trade", {trade, postDate});
        } else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) =>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(trade=>{
        if(trade) {
            return res.render("./trade/edit", {trade});
        } else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) =>{
    let trade = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }
    
    model.findByIdAndUpdate(id, trade, {useFindAndModify: false, useUnifiedTopology:true})
    .then(trade =>{
        if (trade) {
            res.redirect("/trades/" + id);
        } else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(trade=>{
        if(trade) {
            res.redirect("/trades");
        } else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            return next(err);
        }
    })    
    .catch(err=>next(err));
};