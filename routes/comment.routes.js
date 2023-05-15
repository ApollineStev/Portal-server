const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

// 🍊comment(author, post, message, date) - get, post, put, delete

router.post("/posts/:postId/comment", (req, res, next) => {

  const { postId } = req.params;
  const { author, message, date } = req.body; //(🍊author)

  User.findOne({ name: author })
    .then(userFromDB => {
      user = userFromDB;
    }) // 🍊check if is necessary!
    .then(user => {
      Post.findById(postId)
      .then(postFromDB => {
        let newComment = new Comment({ author: user._id, message, date })

        newComment.save()
        .then(commentFromDB => {
          postFromDB.comments.push(commentFromDB._id)

          postFromDB.save()
          .then(updatedPost => res.json(updatedPost))
        })
      })
    })
    .catch((error) => res.json(error));

});




module.exports = router;