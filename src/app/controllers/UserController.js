const bcrypt = require('bcrypt')

const handlerbarsUtil = require('../../util/handlerbars')

const User = require('../models/User')

class userController {
    
    // GET /:username
    user(req, res) {
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            res.render('body/user/user', {
                userSite: true,
                userSetting: true,
                isLoggedin: handlerbarsUtil.isLoggedin(req),
                username: handlerbarsUtil.getUsername(req),
                cart: handlerbarsUtil.getCart(req),
                user: {
                    userSite: true,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    address: user.address,
                    card: user.card
                }
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // POST Change User Info
    changeUserInfo(req, res) {
        User.findOneAndUpdate({
            username: handlerbarsUtil.getUsername(req)
        }, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: {
                city: req.body.city,
                dist: req.body.dist,
                detail: req.body.detail
            }
        })
        .then(user => {
            res.redirect(`/user/${handlerbarsUtil.getUsername(req)}`)
        })
        .catch(err => {
            res.json(err)
        })
    }

    
    // POST Change Card
    changeCard(req, res) {
        User.findOneAndUpdate({
            username: handlerbarsUtil.getUsername(req)
        }, {
            card: {
                cardnumber: req.body.cardnumber,
                expiration: {
                    year: req.body.year,
                    month: req.body.month
                },
                ccv: req.body.ccv,
                cardname: req.body.cardname,
                billingaddr: req.body.billingaddr,
                postalcode: req.body.postalcode
            }
        })
        .then(user => {
            res.redirect(`/user/${handlerbarsUtil.getUsername(req)}`)
        })
        .catch(err => {
            res.json(err)
        })
    }


    // POST Change Password
    changePassword(req, res) {
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                .then(validPassword => {
                    if (validPassword) {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.body.newPassword, salt)
                            .then(hash => {
                                User.findOneAndUpdate({
                                    username: handlerbarsUtil.getUsername(req)
                                }, {
                                    password: hash,
                                })
                                .then(data => {
                                    res.redirect(`/user/${handlerbarsUtil.getUsername(req)}`)
                                })
                            })
                        })
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

}

module.exports = new userController