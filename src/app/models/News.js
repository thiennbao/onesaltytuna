const mongoose = require("mongoose");

const Schema = mongoose.Schema

const News = Schema({
    name: {type: String},
    content: {type: String},
    img: {type: String},
    date: {type: Date, default: new Date()}
})

module.exports = mongoose.model('News', News)