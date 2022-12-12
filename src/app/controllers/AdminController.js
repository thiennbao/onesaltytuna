


class adminController {

    // GET admin
    admin(req, res) {
        res.render('admin', {
            admin: true,
            noHeader: true
        })
    }
}

module.exports = new adminController