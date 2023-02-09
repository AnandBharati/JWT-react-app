const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const blogData = require('../data')

/* //middleware to verify token at every incoming request
function authenticateToken(req, res, next) {
    console.log('inside middleware');
    const authHeader = req.headers['authorization']
    // authHeader should be in form of=>   Bearer<space>Token
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401)

    //this function will verify the token received by Client annd
    //payload is extracted from token and passed to callback
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload.username; // for simple referencing in future
        next();
    })
}

router.get('/', authenticateToken, (req, res) => {
    res.json(req.user);
}); */

router.post('/signup', (req, res) => {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err, doc) => {
        if (err) return res.json({ eroor: err })
        console.log(doc);
        console.log('saved successfully');
        res.json({ data: doc })
    })
})


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        const result = await userModel.findOne({ username: username })
        if (result) {
            console.log(result)
            if (result.password === password) {
                const payload = { username: result.username, email: result.email, password: result.password };
                //creating token so that it can be send to Client
                const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
                return res.json({ token: signedToken })
            }
            else {
                res.sendStatus(401) //unathorized
            }
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.post('/tokenization', (req, res) => {
    //authenticate login
    // const username = req.body.username;
    const payload = req.body;
    //**here token will ne generated and passed to client so that client can attach it will each request */
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    res.json({ token: access_token })
});

module.exports = router;