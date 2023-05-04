const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post.model");

// POST create post

router.get('/post', /*isLoggedIn,*/ (req, res) => {
    res.json(Post.data) 
});

router.post('/post-create',/* isLoggedIn, fileUploader.single('imageUrl'),*/ (req, res, next) => {
    
   // const author = req.session.currentUser._id
    
    const {title, description, genre, date } = req.body;

    Post.create({title, description, genre, date })
    .then((recipe) => res.json(Post))
    .catch(error => next(error))

});

// Get all post

router.get('/recipes', (req, res, next) => {
    Recipe.find()
    .then(recipes => {
            res.render("recipes/recipe-list", {recipe: recipes ,
                userInSession: req.session.currentUser})
    })
    .catch(err => next(err))
})