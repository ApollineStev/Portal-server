const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

// 🍊comment(author, post, message, date) - get, post, put, delete

router.post("/comment", (req, res, next) => {
  const { message , userId, date, postId } = req.body

  Comment.create({ message, user: userId, date, post: postId})
  .then(newComment => {
    return Post.findByIdAndUpdate(postId, {$push: { comment: newComment._id} } )
  })
  .then(res => res.json(res))
  .catch(err => res.json(err))

})




module.exports = router;