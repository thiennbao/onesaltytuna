const mongooseUtil = require('../../util/mongoose')

const Order = require('../models/Order')

class superController {

    // GET admin
    super(req, res) {
        var page = req.query.page
        if (page > 1) {
            page = Number(page)
        } else {
            page = 1
        }
        const pageSize = 3
        var start = ( page - 1 ) * pageSize
        Order.find({})
        .skip(start)
        .limit(pageSize)
        .then(order => {
            res.render('super', {
                super: true,
                noHeader: true,
                order: mongooseUtil.getData(order)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = new superController