import express from 'express';
import mongoose from 'mongoose';
import registers from './routes/register.js'
import verify from './routes/VerificationRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import clientrouter from './routes/configrouter.js';

dotenv.config();

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

app.use('/Addclient', clientrouter);
app.use('/GetClient', clientrouter);
app.use('/GetClientfalse', clientrouter);
app.use('/EditCLient', clientrouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db", process.env.PORT);
        })
    }).catch((error) => {
        console.log(error)
    })