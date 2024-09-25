const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/api/login', authMiddleware.hashPasswordWithSHA256, authController.login_post)

router.post('/api/register', authMiddleware.hashPasswordWithSHA256, authController.register_post)


module.exports = router