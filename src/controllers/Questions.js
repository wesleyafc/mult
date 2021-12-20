const Question = require('../models/Question')

module.exports.index = async function (request, response) {
    return response.send("home")
}

module.exports.createNewQuestion = async function (request, response) {
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
}

module.exports.showAllQuestions = async function (request, response) {
    /**
     * maybe this is not necessary,and need remove in future
     */
    try {
        const AllQuestions = await Question.find()
        return response.status(200).json(AllQuestions)
    } catch (error) {
        return response.status(500).json({ "error": error })

    }
}

module.exports.getOneById = async function (request, response) {

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
}

module.exports.updateOneById = async function (request, response) {
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
}

module.exports.deleteOneById = async function (request, response) {
    try {
        const _id = request.params.id
        const question = await Question.deleteOne({ _id })

        if (question.deletedCount === 0) {
            return response.status(404).json();

        } else {
            return response.status(204).json()
        }
    } catch (error) {
        return response.status(500).json({ "error": error })

    }
}