const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const fileUploader = require('../config/cloudinary.config')

const Post = require("../models/Post.model");
const User = require('../models/User.model')

//  GET /posts -  Retrieves all posts
  // Each Post document has `author` array holding `_id`s of User documents 
  // We use .populate() method to get swap the `_id`s for the actual name
router.get("/", (req, res, next) => {
  User.find()
  .populate('post')
  .catch(err => res.json(err))

  Post.find()
    .then(posts => res.json(posts))
    .catch((err) => res.json(err));
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});

//  POST /posts  -  Creates a new post
router.post("/create", fileUploader.single('imageUrl'), (req, res, next) => {

  const { title, userId, gameName, genre, review, rating, imageUrl, date } = req.body;
  // 🍊 image!!!
  Post.create({ title, user: userId , gameName, genre, review, rating, imageUrl, date })
     .then((newPost) => {
      return User.findByIdAndUpdate(userId, {
        $push: { post: newPost._id}
      })
     })
    
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

//  GET /posts/:postId -  Retrieves a specific post by id
router.get("/:postId", (req, res, next) => {
  const { postId } = req.params;


  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  
  Post.findById(postId)
    .populate("user")
    .then((post) => res.status(200).json(post))
    .catch((error) => res.json(error));
});

// PUT  /posts/:postId  -  Updates a specific post by id
router.post("/:postId/edit", (req, res, next) => {
  const { postId } = req.params;

  const { title, userId, gameName, genre, review, rating, imageUrl, date } = req.body;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(postId,{ title, user: userId , gameName, genre, review, rating, imageUrl, date }, { new: true })
    .then((updatedPost) => res.json(updatedPost))
    .catch((error) => res.json(error));
});

// DELETE  /posts/:postId  -  Deletes a specific post by id
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
