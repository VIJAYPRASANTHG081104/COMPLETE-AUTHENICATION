const express = require('express');
const router = express.Router();
const controller = require('../controller/appController');
const Auth = require('../middleware/auth');
const localVariable = require('../middleware/localVariable'); // Import correct middleware
const registerMail = require('../controller/mailer')
// ...rest of your code


// POST METHODS
router.post('/register',controller.register)
router.post('/registerMail',registerMail)
router.post('/authenticate',controller.verifyUser,(req,res) => res.end())
router.post('/login',controller.verifyUser,controller.login)
//GET METHODS
router.get('/user/:username',controller.getUser)
router.get('/generateOTP',controller.verifyUser,localVariable,controller.generateOTP)
router.get('/verifyOTP',controller.verifyOTP)
router.get('/createResetSession',controller.createResetSession)
//PUT METHODS
router.put('/updateuser',Auth,controller.updateUser)
router.put('/resetPassword',controller.verifyUser,controller.resetPassword)


module.exports = router