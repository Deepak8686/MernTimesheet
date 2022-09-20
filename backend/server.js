const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const registers = require('./routes/register')
const verify = require('./routes/VerificationRoute')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
var corsOptions = {
    origin: "http://localhost:3001",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(express.json())

app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/api/log', registers)
app.use('/api/log', verify)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db", process.env.PORT);
        })
    }).catch((error) => {
        console.log(error)
    })