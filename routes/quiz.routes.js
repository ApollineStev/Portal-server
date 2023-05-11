const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quiz = require("../models/Quiz.model");
const User = require("../models/User.model");

// 🍊
// Get /api/quizzes/random -  Retrieves randomly
// Get /api/quizzes/difficulty?easy -  Retrieves quiz by difficulty (easy, intermediate, difficult)
// Get /api/quizzes/theme?retro -  Retrieves quiz by theme (retro, new, online, adventure, ...)


//  POST /api/quizzes  -  Creates a new quiz
router.post("/create", (req, res, next) => {

  const {title, author, difficulty, theme, question, question2 } = req.body;

  Quiz.create({ title, author, difficulty, theme, question, question2 })
    .then((newQuiz) => {
      res.json(newQuiz)
      /*return User.findByIdAndUpdate(author, {
        $push: { quiz: newQuiz._id}
      }, {new: true}).populate("quiz")*/
      
    })
    .catch((err) => res.json(err));
});

// Get quizz

router.get('/', (req, res, next) => {
  Quiz.find().then(quiz => {
    res.json(quiz)
  })
})

// PUT  /api/quizzes/:quizId  -  Updates a specific quiz by id
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

// DELETE  /api/quizzes/:quizId  -  Deletes a specific quiz by id
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