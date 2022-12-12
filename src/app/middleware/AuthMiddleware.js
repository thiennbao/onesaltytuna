const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const User = require('../models/User')

class authMiddleware {

    // Check is logged in
    checkLoggedin(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                User.findById(data._id)
                .then(user => {
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
                })
                .catch(err => {
                    res.redirect('/auth/login')
                })
            }
        } catch (err) {
            next()
        }
    }

    // Check user
    checkUser(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            var username = req.params.user
            if (data) {
                User.findById(data._id)
                .then(user => {
                    if(username == user.username) {
                        next()
                    } else {
                        res.json('403')
                    }
                })
                .catch(err => {
                    res.redirect('/auth/login')
                })
            }
        } catch (err) {
            res.redirect('/auth/login')
        }
    }

    // Check is User
    checkIsUser(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                User.findById(data._id)
                .then(user => {
                    if(user.role == 'super' || user.role == 'admin') {
                        res.json('403')
                    } else {
                        next()
                    }
                })
            }
        } catch (err) {
            next()
        }
    }

    // Check is User
    checkIsSuper(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                User.findById(data._id)
                .then(user => {
                    if(user.role == 'super') {
                        next()
                    } else {
                        res.json('403')
                    }
                })
            }
        } catch (err) {
            res.json('403')
        }
    }

}

module.exports = new authMiddleware