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
    catch(err){
        console.log(err)
    }
} 
const con= connectDB();

const jwt = require('jsonwebtoken');

const authRouter = require('./routers/auth');
const blogRouter= require('./routers/blogs');
const userRouter= require('./routers/users')

const app = express();
app.use(express.json()); //so that app can accept json in request body
app.use(cors());

app.listen(process.env.PORT || '3000', ()=>{
    console.log('listening to port', process.env.PORT || '3000')
}) 

app.get('/',(req, res)=>{
    res.json({message: "working"})
})

//routing to auth.js
app.use('/auth', authRouter)
app.use('/blogs', blogRouter)
app.use('/users', userRouter)