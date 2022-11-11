import express from 'express';
import { registerctrl, Userctrl, Changepassword, Singleuserctrl, UserDeactivectrl } from '../controllers/Registercontroller.js';
import { Loginctrl } from '../controllers/Registercontroller.js';
import auth from '../middleware/middleware.js';

const router = express.Router()

router.post('/register', registerctrl)
router.post('/Login', Loginctrl);
router.get('/user', auth, Userctrl);
router.post('/changepassword', Changepassword);
router.get('/userprofile/:Email_Id', auth, Singleuserctrl);
router.get('/deactivatedemployee', auth, UserDeactivectrl);

export default router;