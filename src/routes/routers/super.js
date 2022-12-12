const express = require('express')
const router = express.Router()

const superController = require('../../app/controllers/SuperController')

const authMiddleware = require('../../app/middleware/AuthMiddleware')

// Super
router.get('/list', authMiddleware.checkIsSuper, superController.list)
router.get('/storage', authMiddleware.checkIsSuper, superController.storage)
router.get('/search', authMiddleware.checkIsSuper, superController.search)
router.get('/:user', authMiddleware.checkIsSuper, authMiddleware.checkUser, superController.super)

// Close an order
router.post('/close', superController.close)

// Super setting
router.post('/changeSuperInfo', superController.changeSuperInfo)
router.post('/changePassword', superController.changePassword)


module.exports = router