const express = require('express');
const { MailVerification, VerifyOtp, PhoneVerification } = require('../controllers/VerifyController');

const router = express.Router();

router.post('/sentmail', MailVerification);
router.post('/sentmessage', PhoneVerification);
router.post('/verifyotp', VerifyOtp);

module.exports = router;