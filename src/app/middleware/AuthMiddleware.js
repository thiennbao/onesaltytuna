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
                res.redirect('/')
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
}

module.exports = new authMiddleware