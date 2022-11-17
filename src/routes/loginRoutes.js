const express = require('express')
const userControllers = require('../controllers/controllers')
const router = express.Router()

router.route("/").post(userControllers.loginUser)

module.exports = router