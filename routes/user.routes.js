const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/:userId", (req, res, next) => {
    
    const { userId } = req.params

    User.findById(userId)
    .then(user => res.json(user))
    .catch(e => res.send(e.message))
    
})

router.get("/", (req, res, next) => {

    User.find()
    .then(user => res.json(user))
    .catch((err) => res.json(err));
    
})

// 🍊 saved posts, my posts, following user's posts

module.exports = router;