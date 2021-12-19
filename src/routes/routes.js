const express = require('express');
const router = express.Router();
const Question = require('../models/Question')


//create question
router.post('/question/create', async (request, response) => {
    try {
        const { description } = request.body
        const { alternatives } = request.body
        const { imageURL } = request.body

        const question = await Question.create({
            description,
            alternatives,
            imageURL
        })


        return response.status(201).json(question)
    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})

//all questions
router.get('/questions/all', async (request, response) => {
    try {
        const AllQuestions = await Question.find()
        return response.status(200).json(AllQuestions)
    } catch (error) {
        return response.status(500).json({ "error": error })

    }
})

//get one by id
router.get('/questions/one/:id', async (request, response) => {
    try {
        const _id = request.params.id

        const question = await Question.findOne({ _id })
        if (!question) {
            return response.status(404).json({})
        } else {
            return response.status(200).json(question)
        }
    } catch (error) {
        return response.status(500).json({ "error": error })
    }
})

//update one by id
router.put('/questions/edit/:id', async (request, response) => {
    try {

        const _id = request.params.id

        const { description, alternatives, imageURL } = request.body

        let question = await Question.findOne({ _id })

        if (!question) {
            question = await Question.create({
                description,
                alternatives,
                imageURL
            })
            return response.status(201).json(question)
        } else {
            question.description = description
            question.alternatives = alternatives
            question.imageURL = imageURL

            await question.save()

            return response.status(200).json(question)
        }
    } catch (error) {
        return response.status(500).json({ "error": error })

    }
})

//delete one by id
router.delete('/questions/:id', async (request, response) => {
    try {
        const _id = request.params.id
        const question = await Question.deleteOne({ _id })

        if (question.deletedCount === 0) {
            return response.status(404).json();

        } else {
            return response.status(204).json()
        }

        return response.status(200)
    } catch (error) {
        return response.status(500).json({ "error": error })

    }
})

router.get('/', (request, response) => {
    response.send("Maiaaaaaan route")
})


module.exports = router