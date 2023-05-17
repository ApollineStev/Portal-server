const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");

router.get("/:userId", (req, res, next) => {
    
    const { userId } = req.params

    User.findById(userId)
    .then(user => res.json(user))
    .catch(e => res.send(e.message))
    
})

router.put("/:userId/edit", (req, res, next) => {
    const { userId } = req.params;

    const { name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    User.findByIdAndUpdate(userId, { name, description }, { new: true })
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});



///// test for delete edit post 
router.get("/:userId/posts", (req, res, next) => {
    const { userId } = req.params

    Post.find({ author: userId })
    .then(posts => {
        console.log(posts)
        res.json(posts)
    })
})

/* router.get("/", (req, res, next) => {

    User.find()
    .then(user => res.json(user))
    .catch((err) => res.json(err));
    
}) */

// 🍊 saved posts, my posts, following user's posts

module.exports = router;