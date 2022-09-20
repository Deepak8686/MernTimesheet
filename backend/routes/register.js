const express = require('express');
const { registerctrl, Userctrl, Changepassword, Singleuserctrl } = require('../controllers/Registercontroller');
const { Loginctrl } = require('../controllers/Registercontroller');
const auth = require('../middleware/middleware');

const router = express.Router()

router.post('/register', registerctrl)
router.post('/Login', Loginctrl);
router.get('/user', auth, Userctrl);
router.post('/changepassword', Changepassword);
router.get('/userprofile/:Email_Id', auth, Singleuserctrl);

module.exports = router