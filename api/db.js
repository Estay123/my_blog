const mongoose = require("mongoose");

module.exports = function connectDB() {
  const url = "mongodb://0.0.0.0:27017/blogWebsite";

  try {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (err) {
    console.error("连接数据库失败: ", err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });

  return;
};
