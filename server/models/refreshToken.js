const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    refreshToken:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('refreshToken', refreshTokenSchema);