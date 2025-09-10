const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    id: {
        type: String, required: true
    },
    genre: {
        type: String, required: true
    }
}
)
const BookModel = mongoose.model('Book', bookSchema)
module.exports = (BookModel)
