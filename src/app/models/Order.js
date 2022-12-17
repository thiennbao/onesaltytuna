const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Order = Schema({
    username: {type: String},
    name: {type: String},
    phone: {type: Number},
    address: {type: String},
    method: {type: String},
    cardnumber: {type: String},
    expiration: {type: String},
    ccv: {type: String},
    cardname: {type: String},
    billingaddr: {type: String},
    postalcode: {type: String},
    message: {type: String},
    content: {type: String},
    ship: {type: Number},
    supername: {type: String, default: ''},
    status: {type: String, default: 'in process'},
    paystatus: {type: String, default: 'unpaid'}
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Order', Order)