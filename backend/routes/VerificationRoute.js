import express from 'express';
import { MailVerification, VerifyOtp, PhoneVerification } from '../controllers/VerifyController.js';

const router = express.Router();

router.post('/sentmail', MailVerification);
router.post('/sentmessage', PhoneVerification);
router.post('/verifyotp', VerifyOtp);

export default router;