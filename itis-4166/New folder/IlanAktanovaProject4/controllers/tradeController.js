// import model 
const itemModel = require("../models/item");


// render collection items 
exports.trades = (req, res, next) => {
    itemModel.find()
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


// render "create new item" page 
exports.new = (req, res) =>{
    res.render("./trade/newTrade");
};


// process and add the new item to the database 
exports.create = (req, res, next) =>{
    let trade = new itemModel(req.body);                   // create a new item document 
    let price = trade.price.toFixed(2);                    // format the price to round it to 2 decimals 
    let catLow = trade.category.toLocaleLowerCase();       // format the category
    let category = catLow.charAt(0).toUpperCase() + catLow.slice(1)
    trade.brand = req.session.user;                        // add user's info 
    trade.category = category;
    trade.price = price;                                   // save formated price 
    trade.img = "/public/images_folder/item_1.jpg";        // add item image manually 
    trade.save()                                           // save and add the doc to the database 
    .then(trade=>res.redirect("/trades"))
    .catch(err=> {
        if(err.name==="ValidationError"){
            err.status = 400;
        }
        next(err);
    });
};


// render called item's page and display that item's info 
exports.show = (req, res, next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){                  // an objectId is a 24-bit Hex string
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }

    itemModel.findById(id).populate('brand', 'userName')
    .then(trade=>{
        if(trade) {
            let timestamp = trade.createdAt;
            let date = timestamp.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric',  year: 'numeric'})
            let time = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short'})
            let postDate = date + ' at ' + time;
            return res.render("./trade/trade", {trade, postDate});
        } 
        else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


// render called item's edit page and let the user to edit the item info 
exports.edit = (req, res, next) =>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }

    itemModel.findById(id)
    .then(trade=>{
        if(trade) {
            return res.render("./trade/edit", {trade});
        } 
        else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


// process the edited item and save changes to the database 
exports.update = (req, res, next) =>{
    let trade = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error("Invalid product id");
        err.status = 400;
        return next(err);
    }
    
    itemModel.findByIdAndUpdate(id, trade, {useFindAndModify: false, runValidators: true})
    .then(trade =>{
        if (trade) {
            res.redirect("/trades/" + id);
        } 
        else {
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

    itemModel.findByIdAndDelete(id, {useFindAndModify: false})
    .then(trade=>{
        if(trade) {
            res.redirect("/trades");
        } 
        else {
            let err = new Error("Cannot find a product with id " + id);
            err.status = 404;
            return next(err);
        }
    })    
    .catch(err=>next(err));
};