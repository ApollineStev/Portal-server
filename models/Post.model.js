const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  gameName: { type: String, required: true },
  genre: { 
    type: String, 
    enum: ["RPG", "Arcade", "", ""],
    required: true 
  },
  review: { type: String, required: true },
  image: { type: String },
  rating: { 
    type: Number, 
    enum: [0, 1, 2, 3, 4, 5],
    required: true 
  },
  date: { type: Date, default: Date.now }
});

module.exports = model("Post", postSchema);
