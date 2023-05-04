const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const listSchema = new Schema({
  author: [{ type: Schema.Types.ObjectId, ref: "User" }],
  listTitle: { type: String, required: true },
  game: { type: [String] },
});

module.exports = model("List", listSchema);