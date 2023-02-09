const mongoose = require('mongoose')

const blogSchema = {
    title : {type: String, require: true},
    desc: String,
    createdBy: {type: String, require: true},
    createdOn: {type: Date, require: true},
}

module.exports = new mongoose.model('blog', blogSchema);