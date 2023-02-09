const router = require('express').Router();
const mongoose = require('mongoose');
const blogModel = require('../models/blogs');

router.post('/newblog', async (req, res)=>{
    const blog={
        title: req.body.title,
        desc: req.body.desc,
        createdBy: req.body.createdBy,
        createdOn: req.body.createdOn
    }

    const newBlog = new blogModel({...blog});

    try{
        const result= await newBlog.save();
        res.json({result});
    }
    catch(err){
        res.json({err})
    }

})

module.exports = router;