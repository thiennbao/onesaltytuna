const siteRouter = require('./routers/site')

function route(app) {

    app.use('/', siteRouter)
}

module.exports = route