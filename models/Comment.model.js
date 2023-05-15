const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = model("Comment", commentSchema);
