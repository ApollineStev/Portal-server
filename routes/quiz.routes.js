const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quiz = require("../models/Quiz.model");
const User = require("../models/User.model");


// Get /quizzes/random -  Retrieves randomly
router.get('/random', (req, res, next) => {
  Quiz.estimatedDocumentCount().then((count) => {
    let random = Math.floor(Math.random() * count)
    Quiz.findOne().skip(random)
    .then(randomQuiz => res.status(200).json(randomQuiz))
  })
  .catch((error) => res.json(error));
})

// Get /quizzes/:quizId -  Retrieves a specific quiz by id
router.get('/:quizId', (req, res, next) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Quiz.findById(quizId).then(quiz => {
    res.status(200).json(quiz)
  })
  .catch((error) => res.json(error));
})

// Get /quizzes/easy -  Retrieves a quiz by difficulty
router.get('/easy', (req, res, next) => {
  
  let EasyQuiz = Quiz.find({ difficulty: "easy" })
  console.log(EasyQuiz)

  EasyQuiz.estimatedDocumentCount()
  .then((count) => {
    let random = Math.floor(Math.random() * count)
    EasyQuiz.findOne().skip(random)
    .then(randomQuiz => res.status(200).json(randomQuiz))
  })
  .catch((error) => res.json(error));
})

router.get('/intermediate', (req, res, next) => {
  
  let IntermediateQuiz = Quiz.find({ difficulty: intermediate })
  
  IntermediateQuiz.estimatedDocumentCount()
  .then((count) => {
    let random = Math.floor(Math.random() * count)
    IntermediateQuiz.findOne().skip(random)
    .then(randomQuiz => res.status(200).json(randomQuiz))
  })
  .catch((error) => res.json(error));

})


// 🍊 query&params?
// Get /quizzes/difficulty?easy -  Retrieves quiz by difficulty
// Get /quizzes/genre?action -  Retrieves quiz by theme



//  POST /quizzes/create  -  Creates a new quiz
router.post("/create", (req, res, next) => {

  const {author, question, genre, difficulty, answer, answer2, answer3, answer4, message } = req.body;

  Quiz.create({ author, question, genre, difficulty, answer, answer2, answer3, answer4, message })
    .then((newQuiz) => {
      res.json(newQuiz)
      /*return User.findByIdAndUpdate(author, {
        $push: { quiz: newQuiz._id}
      }, {new: true}).populate("quiz")*/
      
    })
    .catch((err) => res.json(err));
});


// PUT  /quizzes/:quizId  -  Updates a specific quiz by id
router.put("/:quizId", (req, res, next) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Quiz.findByIdAndUpdate(quizId, req.body, { new: true })
    .then((updatedQuiz) => res.json(updatedQuiz))
    .catch((error) => res.json(error));
});

// DELETE  /quizzes/:quizId  -  Deletes a specific quiz by id
router.delete("/:quizId", (req, res, next) => {
  const { quizId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Quiz.findByIdAndRemove(quizId)
    .then(() =>
      res.json({
        message: `Quiz with ${quizId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;