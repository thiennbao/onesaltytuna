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
                        res.render('body/error/error', {err403: true})
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
                        res.render('body/error/error', {err403: true})
                    } else {
                        next()
                    }
                })
            }
        } catch (err) {
            next()
        }
    }

    // Check is Super
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
                        res.render('body/error/error', {err403: true})
                    }
                })
            }
        } catch (err) {
            res.render('body/error/error', {err403: true})
        }
    }

    // Check is Admin
    checkIsAdmin(req, res, next) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                User.findById(data._id)
                .then(user => {
                    if(user.role == 'admin') {
                        next()
                    } else {
                        res.render('body/error/error', {err403: true})
                    }
                })
            }
        } catch (err) {
            res.render('body/error/error', {err403: true})
        }
    }


}

module.exports = new authMiddleware