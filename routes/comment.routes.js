const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Comment = require("../models/Comment.model");
const User = require("../models/User.model");
const Post = require("../models/Post.model");

// 🍊comment(author, post, message, date) - get, post, put, delete

router.get("/:postId/comments", (req, res, next) => {
  const { postId } = req.params;
  
  Comment.find({ post: postId })
  .populate("author")
  .then((comments) => { 
    res.status(200).json(comments)
  })
  .catch((error) => res.json(error));

})

router.post("/:postId/comments", (req, res, next) => {

  const { postId } = req.params;
  const { author, post, message, date } = req.body;
  
  Comment.create({author, post, message, date})
  .then((comment)=>{

    User.findOne({_id: comment.author}).then(author => {

      Post.findById(postId)
      .then(post => {
        post.comments.push(comment._id)
        post.save()
        res.json({comment, author})
      })
    })
    
  })
  .catch((err) => res.json(err));

});

router.delete("/:postId/comments/:commentId", (req, res, next) => {
  const { postId } = req.params;
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Comment.findByIdAndRemove(commentId)
    .then(comment => {
      Post.findByIdAndUpdate(postId)
      .then(post => {
        post.comments.pull(commentId)
        post.save()
        res.json({
          message: `Comment with ${commentId} is removed successfully.`,
        })
      })
    })
    .catch((error) => res.json(error));


});

module.exports = router;