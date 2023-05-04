const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  difficulty: { 
    type: String, 
    enum: ["easy", "intermediate", "difficult"],
    required: true 
  },
  theme: { 
    type: String, 
    enum: ["retro", "new", "online", "adventure"],
    required: true 
  },
  question: { type: String, required: true },
  answer: { type: [String], required: true },
  addedAnswer: { type: [String] },
  date: { type: Date, default: Date.now }
});

module.exports = model("Quiz", quizSchema);
