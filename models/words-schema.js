const mongoose = require('mongoose')

const wordsSchema = new mongoose.Schema(
    {
        imgUrl: {
            type: String,
            required: true
        },
        word: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        }
    }

)

module.exports = mongoose.model('words', wordsSchema)