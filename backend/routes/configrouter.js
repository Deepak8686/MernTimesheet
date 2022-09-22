import express from 'express';
import { AddCLient, Editclient, GetClient, GetClientfalse } from '../controllers/Clientcontroller.js';

const clientrouter = express.Router();


clientrouter.post('/addclientrouter', AddCLient);
clientrouter.get('/getclientrouter', GetClient);
clientrouter.get('/getclientrouterfalse', GetClientfalse);
clientrouter.put('/putclientrouter', Editclient);

export default clientrouter;