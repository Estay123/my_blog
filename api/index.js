const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const UserModel = require("./models/User");
const blogModel = require("./models/Blog");
const jwt = require("jsonwebtoken");
const BlogModel = require("./models/Blog");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
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

app.post("/post", upload.single("file"), (req, res) => {
  const { orignalname } = req.file;
  const parts = orignalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(oath, newPath);
  res.json({ files: req.file });
});

// app.post("/posts", upload.single("file"), async (req, res) => {
//   let title = req.body.title;
//   let file = req.file;
//   let summary = req.body.summary;
//   let paragraph = req.body.paragraph;
//   let author = req.body.author;
//   let date = req.body.date;

//   const { originalname } = req.file;
//   const parts = originalname.split(".");
//   const ext = parts[parts.length - 1];
//   fs.renameSync(req.file.path, req.file.path + "." + ext);
//   const blogDoc = await BlogModel.create({
//     title,
//     summary,
//     author,
//     date,
//     file: newPath,
//     paragraph,
//   });

//   const savedBlog = await newBlog.save();
//   // res.json({ blog: savedBlog, isSuccess: true });
//   const newPath = fs.renameSync(path, newPath);

//   console.log(savedBlog);
//   res.json({ blogDoc });
// });
