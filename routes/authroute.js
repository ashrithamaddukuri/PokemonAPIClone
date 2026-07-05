const {register,login} = require('../controller/authcontroller')
const express = require('express')
const router = express.Router()



router.post('/user/register',register)
router.post('/login',login)


module.exports = router
