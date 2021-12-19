const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    //_id: String,
    description: String,
    imageURL: String,
    alternatives: [
        {
            alternative: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }

        },

    ]
})


module.exports = mongoose.model('Question', QuestionSchema)