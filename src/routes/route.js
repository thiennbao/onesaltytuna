const siteRouter = require('./routers/site')
const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const superRouter = require('./routers/super')
const adminRouter = require('./routers/admin')

function route(app) {

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/super', superRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
}

module.exports = route