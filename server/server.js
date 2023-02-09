const express = require('express');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//database connection
async function connectDB(){
    try{
        const con= await mongoose.connect('mongodb+srv://Anand:Anand12345@cluster0.t1nmhac.mongodb.net/test-jwt')
        return con;
    }
    catch{
        console.log('error on connection')
    }
} 
const con= connectDB();

const jwt = require('jsonwebtoken');

const authRouter = require('./routers/auth');

const app = express();
app.use(express.json()); //so that app can accept json in request body
app.use(cors({origin: '*'}));

const port = process.env.PORT || 3000
app.listen( port, (err)=>{
    !err? console.log('working on port', port) : console.log('error while working', err);
})

//routing to auth.js
app.use('/auth', authRouter)
