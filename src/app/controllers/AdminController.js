const bcrypt = require('bcrypt')

const mongooseUtil = require('../../util/mongoose')
const handlerbarsUtil = require('../../util/handlerbars')

const User = require('../models/User')
const Sushi = require('../models/Sushi')
const News = require('../models/News')
const Contact = require('../models/Contact')


class adminController {

    // GET clerk
    clerk(req, res) {
        User.find({
            role: 'super'
        })
        .then(user => {
            res.render('body/admin/admin', {
                adminSite: true,
                clerk: true,
                super: mongooseUtil.getData(user)
            })
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // POST add clerk
    addClerk(req, res) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt)
            .then(hash => {
                User.create({
                    username: req.body.supername,
                    password: hash,
                    name: req.body.name,
                    phone: req.body.phone,
                    role: 'super'
                })
                .then(data => {
                    res.redirect('/admin')
                })
                .catch(err => {
                    res.send('ERROR')
                })
            })
            .catch(err => {
                res.send('ERROR')
            })
        })
    }

    // GET menu
    menu(req, res) {
        Sushi.find({})
        .then(sushi => {
            res.render('body/admin/menu', {
                adminSite: true,
                amenu: true,
                sushi: mongooseUtil.search(sushi, req, ['name', 'type', 'cost', 'description'], 8)
            })
        })
    }

    // POST
    addDish(req, res) {
        Sushi.create({
            type: req.body.type,
            name: req.body.name,
            cost: req.body.cost,
            description: req.body.description,
            img: req.body.img
        })
        .then(data => {
            res.redirect('/admin/menu')
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // GET news
    news(req, res) {
        News.find({})
        .then(news => {
            res.render('body/admin/news', {
                adminSite: true,
                anews: true,
                news: mongooseUtil.search(news, req, ['name'], 3)

            })
        })
    }

    // POST add news
    addNews(req, res) {
        News.create({
            name: req.body.name,
            content: req.body.content,
            img: req.body.img,
            date: req.body.date
        })
        .then(data => {
            res.redirect('/admin/news')
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // GET contact
    contact(req, res) {
        Contact.find({})
        .then(contact => {
            res.render('body/admin/contact', {
                adminSite: true,
                acontact: true,
                contact: mongooseUtil.search(contact, req, ['name', 'email', 'phone', 'address', 'message'], 3)
            })
        })
    }
}

module.exports = new adminController