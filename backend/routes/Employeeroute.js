import express from 'express';
import auth from '../middleware/middleware.js';
import { Editempctrl, IsactiveEmp } from '../controllers/EmployeeController.js';

const router = express.Router()

router.put('/editemployee/:Employee_Id', auth, Editempctrl);
router.post('/isactiveemp', IsactiveEmp)

export default router;