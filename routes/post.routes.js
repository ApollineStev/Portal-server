const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

const Post = require("../models/Post.model");

//  GET /api/posts -  Retrieves all posts
  // Each Post document has `author` array holding `_id`s of User documents 
  // We use .populate() method to get swap the `_id`s for the actual name
router.get("/posts", (req, res, next) => {
  Post.find()
    .then((allPosts) => res.json(allPosts))
    .catch((err) => res.json(err));
});

//  POST /api/posts  -  Creates a new post
router.post("/posts", (req, res, next) => {

 
  const { author, title, gameName, genre, review, image, rating } = req.body;

  Post.create({ author, title, gameName, genre, review, image, rating })
    .then((newPost) => {
      return User.findByIdAndUpdate(author, {
        $push: { post : newPost._id },
      }, { new: true }).populate('post')
    })
    .then((post) => res.json(post.post))
    .catch((err) => res.json(err));
});

//  GET /api/posts/:postId -  Retrieves a specific post by id
router.get("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  
  Post.findById(postId)
    .populate("author")
    .then((post) => res.status(200).json(post))
    .catch((error) => res.json(error));
});

// PUT  /api/posts/:postId  -  Updates a specific post by id
router.put("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => res.json(error));
});

// DELETE  /api/posts/:postId  -  Deletes a specific post by id
router.delete("/posts/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndRemove(postId)
    .then(() =>
      res.json({
        message: `Post with ${postId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

// 🍊comment(author, post, message, date) - get, post, put, delete



module.exports = router;
