const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  title: String,
  summary: String,
  file: String,
  paragraph:String;
  author:String;
  date:String;
  timestamps:true;
});
const postModel