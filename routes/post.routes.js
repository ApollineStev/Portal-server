const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");

//  GET /api/posts -  Retrieves all posts
  // Each Post document has `author` array holding `_id`s of User documents 
  // We use .populate() method to get swap the `_id`s for the actual name
router.get("/posts", (req, res, next) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch((err) => res.json(err));
});

//  POST /api/posts  -  Creates a new post
router.post("/create", (req, res, next) => {

  const { author, title, gameName, genre, review, image, rating } = req.body;

  Post.create({ author, title, gameName, genre, review, image, rating })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

//  GET /api/posts/:postId -  Retrieves a specific post by id
router.get("/:postId", (req, res, next) => {
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
router.put("/:postId", (req, res, next) => {
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
router.delete("/:postId", (req, res, next) => {
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




module.exports = router;
