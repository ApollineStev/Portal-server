const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");
const Quiz = require('../models/Quiz.model');
const User = require('../models/User.model');
const Comment = require("../models/Comment.model")

router.get('/search', (req, res, next) => {
  
  const lowercaseKeyword = req.query.keyword.toLowerCase();
  const keywordRegex = new RegExp(lowercaseKeyword, 'i')

  const postPromise = Post.find({ $or: [
    {'title': { $regex: keywordRegex }}, 
    {'gameName': { $regex: keywordRegex }},
    {'genre': { $regex: keywordRegex }},
    {'review': { $regex: keywordRegex }}
  ]})
  const quizPromise = Quiz.find({ $or: [
    {'question': { $regex: keywordRegex }}, 
    {'genre': { $regex: keywordRegex }}
  ]})
  const userPromise = User.find({ $or: [
    {'name': { $regex: keywordRegex }}, 
    {'description': { $regex: keywordRegex }}
  ]})
  const commentPromise = Comment.find({ 'message': { $regex: keywordRegex } })
  
  Promise.all([postPromise, quizPromise, userPromise, commentPromise])
    .then(([postResults, quizResults, userResults, commentResults]) => {
      const combinedResults = {
        posts: postResults,
        quizzes: quizResults,
        users: userResults,
        comments: commentResults
      };
      res.status(200).json(combinedResults);
    })
    .catch((err) => res.status(500).json(err))
  
})

module.exports = router;
