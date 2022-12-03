const siteRouter = require('./routers/site')
const authRouter = require('./routers/auth')

function route(app) {

    app.use('/auth', authRouter)
    app.use('/', siteRouter)
}

module.exports = route