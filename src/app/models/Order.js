const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Order = Schema({
    userid: {type: String},
    name: {type: String},
    address: {type: String},
    phone: {type: Number},
    email: {type: String},
    message: {type: String},
    content: {type: String}
})

module.exports = mongoose.model('Order', Order)