import express from 'express';
import auth from '../middleware/middleware.js';
import { Editempctrl } from '../controllers/EmployeeController.js';

const router = express.Router()

router.put('/editemployee/:Employee_Id', auth, Editempctrl);

export default router;