const bcrypt = require('bcrypt')

const mongooseUtil = require('../../util/mongoose')
const handlerbarsUtil = require('../../util/handlerbars')

const User = require('../models/User')
const Order = require('../models/Order')

class superController {

    // GET super:super
    super(req, res) {
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            res.render('body/super/super', {
                username: handlerbarsUtil.getUsername(req),
                superSite: true,
                userSetting: true,
                user: {
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

    // GET order list
    list(req, res) {
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        const pageSize = 3
        var start = ( page - 1 ) * pageSize
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            Order.find({
                status: 'in process'
            })
            .skip(start)
            .limit(pageSize)
            .then(order => {
                res.render('body/super/list', {
                    superSite: true,
                    list: true,
                    username: user.username,
                    order: mongooseUtil.getData(order)
                })
            })
            .catch(err => {
                res.json(err)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // POST close
    close(req, res) {
        Order.findByIdAndUpdate(req.body.id, {
            supername: req.body.super,
            status: 'closed'
        })
        .then(order => {
            res.redirect('super/list')
        })
        .catch(err => {
            res.json(err)
        })
    }

    // GET Storage
    storage(req, res) {
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        const pageSize = 3
        var start = ( page - 1 ) * pageSize
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            Order.find({
                status: 'closed'
            })
            .skip(start)
            .limit(pageSize)
            .then(order => {
                res.render('body/super/storage', {
                    superSite: true,
                    storage: true,
                    username: user.username,
                    storageItem: mongooseUtil.getData(order)
                })
            })
            .catch(err => {
                res.json(err)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // GET Search
   
    search(req, res) {
        User.findOne({
            username: handlerbarsUtil.getUsername(req)
        })
        .then(user => {
            Order.find({
                status: 'closed'
            })
            .then(order => {
                res.render('body/super/search', {
                    superSite: true,
                    search: true,
                    username: user.username,
                    foundItem: mongooseUtil.searchOrder(order, req)
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }

    // POST change super info
    changeSuperInfo(req, res) {
        User.findOneAndUpdate({
            username: handlerbarsUtil.getUsername(req)
        }, {
            phone: req.body.phone,
            email: req.body.email,
            address: {
                city: req.body.city,
                dist: req.body.dist,
                detail: req.body.detail
            }
        })
        .then(user => {
            res.redirect(`/super/${handlerbarsUtil.getUsername(req)}`)
        })
        .catch(err => {
            res.json(err)
        })
    }

    // POST change password
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
                                    res.redirect(`/super/${handlerbarsUtil.getUsername(req)}`)
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
            console.log(err)
        })
    }

}
module.exports = new superController