const router = require('express').Router();
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const refreshTokenModel = require('../models/refreshToken');
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

                insertRefreshToken(result.username, refreshToken) //insert refreshed token to DB
                    .then((result) => console.log({ result }))
                    .catch((error) => console.log({ error }))

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


router.post('/refreshtoken', (req, res) => {
    const authentication = req.headers.authorization;
    const refreshToken = authentication.split(' ')[1];
    //fetch all existing tokens from database
    let allRefreshedTokens = []
    getRefreshToken(req.body.username).then((result) => {
        result.map((obj) => allRefreshedTokens.push(obj.refreshToken))

        console.log('#### existing tokens ######')
        console.log({ allRefreshedTokens })

        if (allRefreshedTokens.length === 0) {
            console.log('no refresh token in database')
            return res.sendStatus(404);
        }
        else if (!allRefreshedTokens.includes(refreshToken)) {
            console.log('matching refresh token not found in database')
            return res.sendStatus(401);
        }
        else {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                const data = { username: payload.username, email: payload.email, password: payload.password };
                const signedToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })
                return res.json({ token: signedToken, refreshToken })
            })
        }
    })
    // const signedToken = jwt.sign()
});

router.post('/logout', async (req, res) => {
    const authentication = req.headers.authorization;
    const _refreshToken = authentication.split(' ')[1];
    const result = await refreshTokenModel.deleteOne({ username: req.body.username, refreshToken: _refreshToken });
    res.json({ result });
})


async function insertRefreshToken(user, refreshToken) {
    const newToken = new refreshTokenModel({
        'username': user,
        'refreshToken': refreshToken
    })
    try {
        const result = await newToken.save();
        return result
    } catch (error) {
        return error
    }
}

async function getRefreshToken(user) {
    try {
        const result = await refreshTokenModel.find({ username: user })
        return result
    } catch (error) {
        return error
    }

}

module.exports = router;