const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Quiz = require("../models/Quiz.model");

// 🍊
// Get /api/quizzes/random -  Retrieves randomly
// Get /api/quizzes/difficulty?easy -  Retrieves quiz by difficulty (easy, intermediate, difficult)
// Get /api/quizzes/theme?retro -  Retrieves quiz by theme (retro, new, online, adventure, ...)


//  POST /api/quizzes  -  Creates a new quiz
router.post("/quizzes", (req, res, next) => {

  const author = "" // (req.session) 
  const { difficulty, theme, question, answer, date } = req.body;

  Quiz.create({ author, difficulty, theme, question, answer, date })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// PUT  /api/quizzes/:quizId  -  Updates a specific quiz by id
router.put("/quizzes/:quizId", (req, res, next) => {
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
router.delete("/quizzes/:quizId", (req, res, next) => {
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