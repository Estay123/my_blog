const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const BlogModel = require("./models/Blog");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const storage = multer.diskStorage({
//   dest: "uploads/",
//   destination: function (req, file, cb) {
//     console.log(file);
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.listen(4000);

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

app.get("/posts", async (req, res) => {
  const posts = await BlogModel.find();
  res.json(posts);
});

app.post("/posts", upload.single("file"), async (req, res) => {
  let title = req.body.title;
  let file = req.file;
  let summary = req.body.summary;
  let paragraph = req.body.paragraph;
  let author = req.body.author;
  let date = req.body.date;

  console.log(req.body);
  console.log(req.body.title);
  console.log(req.file);

  const newBlog = new BlogModel({
    title,
    author,
    date,
    file: file.filename,
    summary,
    paragraph,
  });
  console.log(newBlog);

  // const savedBlog = await newBlog.save();
  res.json({ message: "ok" });
});
