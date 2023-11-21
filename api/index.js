const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const BlogModel = require("./models/Blog");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  connectDB();

  const { username, password } = req.body;
  let userDoc;

  try {
    userDoc = await UserModel.create({ username, password });
  } catch (e) {
    return res.status(400).json({ message: "Username already exists" });
  }
  const jwtResult = jwt.sign(userDoc.id, "secret");
  return res.json({ user: { ...userDoc, token: jwtResult }, isSuccess: true });
});

app.post("/login", async (req, res) => {
  connectDB();
  const { username, password } = req.body;

  let userDoc;
  try {
    userDoc = await UserModel.findOne({ username });
  } catch (error) {
    return res.status(400).json({ message: "Username does not exist" });
  }

  if (password !== userDoc.password) {
    return res.status(400).json({
      message: "Username and password is not correct",
      isSuccess: false,
    });
  }

  const jwtResult = jwt.sign(userDoc.id, "secret");

  return res.json({
    user: { id: userDoc.id, username, token: jwtResult },
    isSuccess: true,
  });
});
app.post("/logout", (req, res) => {
  res.removeAllListeners.id("userDoc.id");
  return res.json({ message: "Logged out" });
});
app.listen(4000);

app.get("/posts", async (req, res) => {
  const posts = await BlogModel.find();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const newBlog = new Post(req.body);
  const savedBlog = await newPost.save();
  res.json(savedBlog);
});
