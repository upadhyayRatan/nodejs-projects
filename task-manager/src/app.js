const express = require("express");
require("./db/mongoose");
const User = require("./models/users");
const Task = require("./models/task.js");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

const multer = require("multer");
const upload = multer({
  dest: "images",
});

app.post("/uploadFile", upload.single("profilePhoto"), (req, res, next) => {
  res.send();
});

app.use(express.json());
//use user and task routees
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
