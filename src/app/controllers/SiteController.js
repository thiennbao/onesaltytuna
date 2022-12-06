const mongooseUtil = require('../../util/mongoose')
const handlerbarsUtil = require('../../util/handlerbars')

const Sushi = require('../models/Sushi')
const News = require('../models/News')
const User = require('../models/User')
const Order = require('../models/Order')

class siteController {

    // GET homepage
    home(req, res) {
        Sushi.find({})
        .then(sushi => {

            News.find({})
            .then( news => {
                sushi = mongooseUtil.getRandomSushi(sushi, 8)
                news = mongooseUtil.getNewestNews(news, 3)
                res.render('home', {
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
            console.log(err)
            res.status(500).send('ERROR !!!')
        })

    }

    // GET about
    about(req, res) {
        res.render('about', {
            about: true,
            isLoggedin: handlerbarsUtil.isLoggedin(req),
            username: handlerbarsUtil.getUsername(req),
        })
    }

    // GET menu
    menu(req, res) {
        Sushi.find({})
        .then(sushi => {
            res.render('menu', {
                menu: true,
                isLoggedin: handlerbarsUtil.isLoggedin(req),
                username: handlerbarsUtil.getUsername(req),
                sushi: mongooseUtil.getData(sushi)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // GET contact
    contact(req, res) {
        res.render('contact', {
            contact: true,
            isLoggedin: handlerbarsUtil.isLoggedin(req),
            username: handlerbarsUtil.getUsername(req),
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
            res.render('order', {
                order: true,
                isLoggedin: handlerbarsUtil.isLoggedin(req),
                username: handlerbarsUtil.getUsername(req),
                cart: handlerbarsUtil.getCart(req),
                user: {
                    _id: user._id,
                    username: user.username,
                    address: user.address,
                    phone: user.phone,
                    email: user.email,
                }
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // POST submit order
    submitOrder(req, res) {
        Order.create({
            userid: req.body.userid,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            message: req.body.message,
            content: req.body.content
        })
        .then(data => {
            res.redirect('/')
        })
        .catch(err => {
            res.json(err)
        })
    }

    
}

module.exports = new siteController