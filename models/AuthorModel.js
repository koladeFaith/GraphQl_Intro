const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: true
    },
    age: {
        type: Number, required: true
    }
},
    { timestamps: true }
)
const AuthorModel = mongoose.model('Author', authorSchema)
module.exports = (AuthorModel)
