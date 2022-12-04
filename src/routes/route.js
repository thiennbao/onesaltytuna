const siteRouter = require('./routers/site')
const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')

function route(app) {

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route