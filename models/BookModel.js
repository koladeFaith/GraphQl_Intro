const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name: {
        type: String, required: true, unique: true
    },
    authorId: {
        type: String, required: true
    },
    genre: {
        type: String, required: true
    }
},
    { timestamps: true }

)
const BookModel = mongoose.model('Book', bookSchema)
module.exports = (BookModel)
