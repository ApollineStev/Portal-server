const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");

router.get("/user", (req, res, next) => {
    
    res.json('all good user')
    
})

// 🍊 list(saved game)

module.exports = router;