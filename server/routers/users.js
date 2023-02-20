const mongoose = require('mongoose');
const router = require('express').Router();
const userModel = require('../models/users')

router.get('/all',async (req, res)=>{
   try {
       const result = await userModel.find({});
        res.json([...result])
   } catch (error) {
    
   }
})

module.exports = router;