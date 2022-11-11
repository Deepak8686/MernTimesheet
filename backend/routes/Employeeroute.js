import express from 'express';
import auth from '../middleware/middleware.js';
import { Editempctrl, GetEmpPreviousChange, IsactiveEmp } from '../controllers/EmployeeController.js';

const router = express.Router()

router.put('/editemployee/:Employee_Id', auth, Editempctrl);
router.post('/isactiveemp', auth, IsactiveEmp);
router.get('/emppreviouschange/:Employee_Id', auth, GetEmpPreviousChange);

export default router;