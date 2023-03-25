const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    name: {type: String, required: [true, 'Name attribute is required']},
    brand: {type: String, required: [true, 'Author attribute is required']},
    category: {type: String, required: [true, 'Category attribute is required']},
    price: {type: Number, required: [true, 'Price attribute is required'], 
            min: [5, 'The minimum price amount is $5'],
            max: [500, 'The maximum price amount is $500']},
    status: {type: String, required: [true, 'Status attribute is required'], 
            enum: [ "In Stock", "Out Of Stock"]},
    details: {type: String, required: [true, 'Details attribute is required'],
            minLength: [10, 'Details should have at least 10 characters']},
    img: {type: String},
    createdAt: {type: Date, default: Date.now}} 
);

const Trade = mongoose.model('Items', tradeSchema);

module.exports = Trade;