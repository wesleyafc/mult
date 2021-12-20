const express = require('express');
const router = express.Router();
const questionController = require('../controllers/Questions')


// Home Page
router.get('/', questionController.index)

//Create New Question
router.post('/question/new', questionController.createNewQuestion)

//Show All Questions
router.get('/questions/all', questionController.showAllQuestions)

//get one by id
router.get('/questions/one/:id', questionController.getOneById)

//update one by id
router.put('/questions/edit/:id', questionController.updateOneById)

//delete one by id
router.delete('/questions/:id', questionController.deleteOneById)

module.exports = router