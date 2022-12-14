const mongooseUtil = require('../../util/mongoose')
const handlerbarsUtil = require('../../util/handlerbars')

const Sushi = require('../models/Sushi')
const News = require('../models/News')
const User = require('../models/User')
const Order = require('../models/Order')
const Contact = require('../models/Contact')

class siteController {

    // GET homepage
    home(req, res) {
        Sushi.find({})
        .then(sushi => {

            News.find({})
            .then( news => {
                sushi = mongooseUtil.getRandomSushi(sushi, 8)
                news = mongooseUtil.getNewestNews(news, 3)
                res.render('body/site/home', {
                    userSite: true,
                    home: true,
                    isLoggedin: handlerbarsUtil.isLoggedin(req),
                    username: handlerbarsUtil.getUsername(req),
                    sushi: sushi,
                    news: news
                })
            })
            .catch( err => {
                console.log(err)
                res.status(500).send('ERROR !!!')
            })

        })
        .catch(err => {
            res.send('ERROR')
        })

    }

    // GET about
    about(req, res) {
        res.render('body/site/about', {
            userSite: true,
            about: true,
            isLoggedin: handlerbarsUtil.isLoggedin(req),
            username: handlerbarsUtil.getUsername(req),
        })
    }

    // GET menu
    menu(req, res) {
        Sushi.find({})
        .then(sushi => {
            res.render('body/site/menu', {
                userSite: true,
                menu: true,
                isLoggedin: handlerbarsUtil.isLoggedin(req),
                username: handlerbarsUtil.getUsername(req),
                sushi: mongooseUtil.getData(sushi)
            })
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // GET contact
    contact(req, res) {
        res.render('body/site/contact', {
            userSite: true,
            contact: true,
            isLoggedin: handlerbarsUtil.isLoggedin(req),
            username: handlerbarsUtil.getUsername(req),
        })
    }

    // POST contact
    contactForm(req, res) {
        Contact.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            message: req.body.message
        })
        .then(data => {
            res.redirect('/contact')
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // POST cart
    cart(req, res) {
        res.cookie('cart', req.body.order)
        res.redirect('/order')
    }

    // GET order
    order(req, res) {
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            res.render('body/site/order', {
                userSite: true,
                order: true,
                isLoggedin: handlerbarsUtil.isLoggedin(req),
                username: handlerbarsUtil.getUsername(req),
                cart: handlerbarsUtil.getCart(req),
                user: {
                    username: user.username,
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    card: user.card
                }
            })
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    // POST submit order
    submitOrder(req, res) {
        var address
        if (req.body.district) {
            address = `${req.body.detail}, ${req.body.district}, ${req.body.city}`
        } else {
            address = req.body.detail
        }
        var expiration = `${req.body.month}/${req.body.year}`
        Order.create({
            username: req.body.username,
            name: req.body.name,
            phone: req.body.phone,
            address: address,
            method: req.body.method,
            cardnumber: req.body.cardnumber,
            expiration: expiration,
            ccv: req.body.ccv,
            cardname: req.body.cardname,
            billingaddr: req.body.billingaddr,
            postalcode: req.body.postalcode,
            message: req.body.message,
            content: req.body.content,
            ship: req.body.ship
        })
        .then(data => {
            res.clearCookie('cart')
            Sushi.find({})
            .then(sushi => {
                res.render('body/site/menu', {
                    userSite: true,
                    menu: true,
                    isLoggedin: handlerbarsUtil.isLoggedin(req),
                    username: handlerbarsUtil.getUsername(req),
                    sushi: mongooseUtil.getData(sushi),
                    success: true
                })
            })
            .catch(err => {
                res.send('ERROR')
            })
        })
        .catch(err => {
            res.send('ERROR')
        })
    }

    
}

module.exports = new siteController