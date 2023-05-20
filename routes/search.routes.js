const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");
const Quiz = require('../models/Quiz.model');
const User = require('../models/User.model');
const Comment = require("../models/Comment.model")


router.get('/', (req, res, next) => {
  
  const { keyword } = req.query;

  Post.find({ $or: [
    {'title': { $regex: keyword }}, 
    {'gameName': { $regex: keyword }},
    {'genre': { $regex: keyword }},
    {'review': { $regex: keyword }}
  ]})
  /* .then(results => {
    Quiz.find({ $or: [
      {'question': { $regex: keyword }}, 
      {'genre': { $regex: keyword }}
    ]})
    .then(results => {
      User.find({ $or: [
        {'name': { $regex: keyword }}, 
        {'description': { $regex: keyword }}
      ]})
      .then(results => {
        Comment.find({ $or: [
          {'message': { $regex: keyword }}
        ]}) */
        .then(results => res.status(200).json(results))
      
    
  .catch((err) => res.json(err))
})


module.exports = router;
