const router = require('express').Router();
const mongoose = require('mongoose');
const blogModel = require('../models/blogs');



//middleware to verify token on incoming request
function authenication(req, res, next) {
    const authenication = req.headers.authorization;
    const token = authenication.split(' ')[1];

    //to verify the token and extract the payloads
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, extractedData) => {
        if (err) return res.sendStatus(404) //if err then return
        //else if token is correct then we will get extractedData
        console.log(extractedData)
        req.username = extractedData.username;
        next();
    })
}

//to fetch all the blog by user
router.get('/all', authenication, async (req, res) => {
    try{
        const blogs = await blogModel.find({createdBy: req.username})
        res.json({blogs})
    }
    catch(err){
        res.sendStatus(404)
    }
    // const filteredData = blogData.filter((blog) => blog.createdBy === req.username)
    // res.json({ blogs: filteredData });
});

//create new blog
router.post('/new',authenication, async (req, res)=>{
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