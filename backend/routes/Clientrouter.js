const express = require('express')
const { AddCLient, GetClient, GetClientfalse, Editclient } = require('../controllers/Clientcontroller')

const clientrouter = express.Router();


clientrouter.post('/addclientrouter', AddCLient);
clientrouter.get('/getclientrouter', GetClient);
clientrouter.get('/getclientrouterfalse', GetClientfalse);
clientrouter.put('/putclientrouter', Editclient);

module.exports = clientrouter;