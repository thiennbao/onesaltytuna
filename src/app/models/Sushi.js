const mongoose = require("mongoose");

const Schema = mongoose.Schema

const Sushi = Schema({
    type: {type: String},
    name: {type: String},
    cost: {type: Number},
    description: {type: String},
    img: {type: String}
})

module.exports = mongoose.model('Sushi', Sushi)