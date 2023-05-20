const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');


router.get('/', (req, res, next) => {
  res.json("Search page loaded");
})






module.exports = router;
