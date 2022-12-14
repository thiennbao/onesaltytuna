const express = require('express')
const router = express.Router()

const userController = require('../../app/controllers/UserController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')


// User
router.get('/:user', authMiddleware.checkIsUser, authMiddleware.checkUser, userController.user)

// Update
router.post('/changeUserInfo', userController.changeUserInfo)
router.post('/changePassword', userController.changePassword)
router.post('/changeCard', userController.changeCard)

module.exports = router