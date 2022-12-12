const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookie = require('cookie')

const User = require('../models/User')


class authController {
    
    // GET Login
    login(req, res) {
        res.render('body/auth/login', {
            userSite: true,
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
                        switch(user.role) {
                            case 'user':
                                res.redirect('/')
                                break
                            case 'super':
                                res.redirect('/super/list')
                                break
                            case 'admin':
                                res.redirect('/admin')
                                break
                        }
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

    // GET Signup
    signup(req, res) {
        res.render('body/auth/signup', {
            userSite: true,
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
                res.render('body/auth/signup', {
                    userSite: true,
                    signup: true,
                    notAvailable: true,
                    user: {
                        username: req.body.username,
                        phone: req.body.phone,
                        address: {
                            city: req.body.city,
                            dist: req.body.dist,
                            detail: req.body.detail
                        }
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
                            address: {
                                city: req.body.city,
                                dist: req.body.dist,
                                detail: req.body.detail
                            }
                        })
                        .then(data => {
                            res.render('body/auth/signup', {
                                userSite: true,
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

    // Log out
    logout(req, res) {
        res.clearCookie('token')
        res.clearCookie('user')
        res.redirect('/')
    }
}

module.exports = new authController