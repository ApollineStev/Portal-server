const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  question: { type: String, required: true },
  genre: { 
    type: String, 
    enum: ["Action", "Adventure", "MMO", "Puzzle", "RolePlaying", "Simulation", "Sports", "Strategy"],
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ["easy", "intermediate", "difficult"],
    required: true 
  },
  answer: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String, required: true },
  answer4: { type: String, required: true },
  message: { type: String, required: false }
  
},
{
  timestamps: true
});

module.exports = model("Quiz", quizSchema);
