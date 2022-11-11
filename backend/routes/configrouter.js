import express from 'express';
import {
    addCLient,
    addDesignation,
    addEmployeetype,
    editClient,
    editDesignation,
    editEmployeetype,
    getClient,
    getDeactiveClient,
    getDeactiveDesignation,
    getDeactiveEmployeetype,
    getDesignation,
    getEmployeetype
} from '../controllers/Configurationcontroller.js';
import auth from '../middleware/middleware.js';

const configurationrouter = express.Router();


configurationrouter.post('/addclient', auth, addCLient);
configurationrouter.get('/getclient', auth, getClient);
configurationrouter.get('/getdeactiveclient', auth, getDeactiveClient);
configurationrouter.put('/editclient/:Client_Id', auth, editClient);

configurationrouter.post('/adddesignation', auth, addDesignation);
configurationrouter.get('/getdesignation', auth, getDesignation);
configurationrouter.get('/getdeactivedesignation', auth, getDeactiveDesignation);
configurationrouter.put('/editdesignation/:Designation_Id', auth, editDesignation);

configurationrouter.post('/addemployeetype', auth, addEmployeetype);
configurationrouter.get('/getemployeetype', auth, getEmployeetype);
configurationrouter.get('/getdeactiveemployeetype', auth, getDeactiveEmployeetype);
configurationrouter.put('/editemployeetype/:Employeetype_Id', auth, editEmployeetype);

export default configurationrouter;