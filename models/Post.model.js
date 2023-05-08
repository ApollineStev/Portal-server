const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: [true, "title is required"] },
  author: [{ type: Schema.Types.ObjectId, ref: "User", required: [true, "specify the userId"] }],
  gameName: { type: String, required: true },
  genre: { 
    type: String, 
    enum: ["RPG", "Arcade", "Action", "Horror"],
    required: false 
  },
  review: { type: String, required: true },
  image: { type: String },
  rating: { 
    type: Number, 
    enum: [0, 1, 2, 3, 4, 5],
    required: true 
  },
  date: { type: Date, default: Date.now },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
