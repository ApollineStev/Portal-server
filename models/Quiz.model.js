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
  question2: { type: String, required: true}
  
},
{
  timestamps: true
});

module.exports = model("Quiz", quizSchema);
