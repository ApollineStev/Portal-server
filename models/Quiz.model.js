const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const quizSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  title: { type: String, required: true },
  difficulty: { 
    type: String, 
    enum: ["easy", "intermediate", "difficult"],
    required: true 
  },
  theme: { 
    type: String, 
    enum: ["Action", "Adventure", "MMO", "Puzzle", "RolePlaying", "Simulation", "Sports", "Strategy"],
    required: true 
  },
  question: { type: String, required: true },
  question2: { type: String, required: true},
  question3: { type: String, required: false},
  question4: { type: String, required: false}
  
},
{
  timestamps: true
});

module.exports = model("Quiz", quizSchema);
