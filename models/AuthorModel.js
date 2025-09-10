const mongoose = require('mongoose')
const authorSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    id: {
        type: String, required: true
    },
    age: {
        type: String, required: true
    }
}
)
const AuthorModel = mongoose.model('Author', authorSchema)
module.exports = (AuthorModel)
