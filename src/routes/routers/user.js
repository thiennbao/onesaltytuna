const express = require('express')
const router = express.Router()

const userController = require('../../app/controllers/UserController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')


// User
router.get('/:user', authMiddleware.checkUser, userController.user)

// Update
router.post('/changeUserInfo', userController.changeUserInfo)
router.post('/changePassword', userController.changePassword)


module.exports = router