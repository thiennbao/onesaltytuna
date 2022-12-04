const express = require('express')
const router = express.Router()

const userController = require('../../app/controllers/UserController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')


// Site
router.get('/:user', authMiddleware.checkUser, userController.user)


module.exports = router