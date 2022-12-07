const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookie = require('cookie')

const User = require('../models/User')


class authController {
    
    // GET Login
    login(req, res) {
        res.render('login', {
            login: true,
        })
    }

    // POST Login
    loginForm(req, res) {

        User.findOne({
            username: req.body.username
        })
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                .then(validPassword => {
                    if (validPassword) {
                        var token = jwt.sign({
                            _id: user._id
                        }, 'お前はもう死んでいる', {
                            expiresIn: '6h'
                        })
                        res.cookie('user', user.username)
                        res.cookie('token', token, {
                            httpOnly: true,
                            samesite: 'strict'
                        })
                        res.redirect('/')
                    } else {
                        res.json('Wrong password')
                    }
                })


            } else {
                res.send('Username not found')
            }

        })
        .catch(err => {
            res.json('Loi sever')
        })
    }

    // Log out
    logout(req, res) {
        res.clearCookie('token')
        res.clearCookie('user')
        res.redirect('/')
    }

    // GET Signup
    signup(req, res) {
        res.render('signup', {
            signup: true,
        })
    }

    // POST Signup
    signupForm(req, res) {
        User.findOne({
            username: req.body.username
        })
        .then(data => {
            if (data) {
                res.render('signup', {
                    signup: true,
                    notAvailable: true,
                    user: {
                        username: req.body.username,
                        phone: req.body.phone,
                        address: req.body.address
                    }
                })
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt)
                    .then(hash => {
                        User.create({
                            username: req.body.username,
                            password: hash,
                            phone: req.body.phone,
                            address: req.body.address
                        })
                        .then(data => {
                            res.render('signup', {
                                signup: true,
                                success: true
                            })
                        })
                    })
                })
            }
        })
        .catch(err => {
            res.send('ERROR')
        })
    }
}

module.exports = new authController