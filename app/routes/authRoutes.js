module.exports = app => {

const authController = require('../controllers/authController')
var router = require("express").Router();

//Registration - api/v1/auth/register
router.post('/register',authController.registerController)
router.post('/login',authController.loginController)

app.use('/api/v1/auth', router) 

}