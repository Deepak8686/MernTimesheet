import express from 'express';
import { registerctrl, Userctrl, Changepassword, Singleuserctrl } from '../controllers/Registercontroller.js';
import { Loginctrl } from '../controllers/Registercontroller.js';
import auth from '../middleware/middleware.js';

const router = express.Router()

router.post('/register', registerctrl)
router.post('/Login', Loginctrl);
router.get('/user', auth, Userctrl);
router.post('/changepassword', Changepassword);
router.get('/userprofile/:Email_Id', auth, Singleuserctrl);

export default router;