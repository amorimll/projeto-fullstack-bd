const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

router.route("/").post(userControllers.createNewUser)

module.exports = router