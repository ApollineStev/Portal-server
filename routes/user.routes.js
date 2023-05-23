const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Quiz = require("../models/Quiz.model")

router.get("/:userId", (req, res, next) => {
    
    const { userId } = req.params

    User.findById(userId)
    .then(user => res.status(200).json(user))
    .catch((error) => res.status(500).json(error));
    
})

router.put("/:userId/edit", (req, res, next) => {
    const { userId } = req.params;

    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findByIdAndUpdate(userId, { name, description }, { new: true })
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch((error) => res.status(500).json(error));
});

router.get("/:userId/posts", (req, res, next) => {
    const { userId } = req.params

    Post.find({ author: userId })
    .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
    })
    .catch((error) => res.status(500).json(error));
})

router.get("/:userId/quizzes", (req, res, next) => {
    const { userId } = req.params

    Quiz.find({ author: userId })
    .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
    })
    .catch((error) => res.status(500).json(error));
})

// 🍊 saved posts, my posts, following user's posts

module.exports = router;