import express from 'express';
import { addYear, getEmpstatus } from '../controllers/TimesheetController.js';

const timerouter = express.Router()

timerouter.post('/addyear', addYear);
timerouter.get('/getstatus', getEmpstatus)

export default timerouter;