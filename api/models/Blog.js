const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BlogSchema = new Schema({
  title: { type: String, required: true, max: 20, unique: true },
  author: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  summary: { type: String, required: true },
  paragraph: { type: String, required: true },
});

const BlogModel = model("Blog", BlogSchema);

module.exports = BlogModel;
