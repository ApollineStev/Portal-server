const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");

//  GET /api/posts -  Retrieves all posts
  // Each Post document has `author` array holding `_id`s of User documents 
  // We use .populate() method to get swap the `_id`s for the actual name
router.get("/posts", (req, res, next) => {
  Post.find()
    .populate("author")
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
});

//  POST /api/posts  -  Creates a new post
router.post("/posts", (req, res, next) => {

  const { title, gameName, genre, review, image, rating, date, author } = req.body;

  Post.create({ title, author, gameName, genre, review, image, rating, date })
    .then((response) => res.json(response))
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
