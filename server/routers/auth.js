const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const blogData = require('../data');
const { json } = require('express');

const refreshTokens = [];

router.post('/signup', (req, res) => {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err, doc) => {
        if (err) return res.json({ error: err })
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
                const signedToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken);
                return res.json({ token: signedToken, refreshToken })
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


router.get('/refreshtoken', (req, res) => {
    const authentication = req.headers.authorization;
    const refreshToken = authentication.split(' ')[1];

    console.log('##### existing refresh tokens#####')
    console.log(refreshTokens)

    if (refreshTokens.length === 0) {
        return res.sendStatus(404);
    }
    else if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(401);
    }
    else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            const data = { username: payload.username, email: payload.email, password: payload.password };
            const signedToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })
            return res.json({ token: signedToken, refreshToken })
        })
    }

    // const signedToken = jwt.sign()
});

module.exports = router;