const jwt = require('jsonwebtoken')
const cookie = require('cookie')

var handlerbarsUtil = {

    // Get username
    getUsername(req) {
        var cookies = cookie.parse(req.headers.cookie || '')
        return cookies.user
    },

    // Get cart
    getCart(req) {
        var cookies = cookie.parse(req.headers.cookie || '')
        return cookies.cart
    },

    // Check is logged in
    isLoggedin(req) {
        try {
            var cookies = cookie.parse(req.headers.cookie || '')
            var token = cookies.token
            var data = jwt.verify(token, 'お前はもう死んでいる')
            if (data) {
                return true
            }
        } catch (err) {
            return false
        }
    }
}

module.exports = handlerbarsUtil