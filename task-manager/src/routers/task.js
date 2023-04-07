const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth = require("../middlewares/auth");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GEt /tasks?completed=true ->filtering
//Get /tasks?limit=2 ->pagination
//GEt /tasks?limit=2&skip=2 ->pagination
//GET /tasks?sortBy=createdAt:desc ->sorting
router.get("/tasks", auth, async (req, res) => {
  //const tasks = await Task.find({owner:req.user._id});
  //another approach to get task for logged in user
  const match = {};
  const sort={}
  //filtering
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  //sorting
  if(req.query.sortBy){
    const parts=req.query.sortBy.split(':');
    sort[parts[0]]=parts[1]==='desc'?-1:1;
  }
  const limit=req.query.limit?parseInt(req.query.limit):0;
  const skip=req.query.skip?parseInt(req.query.skip):0;

  //check-> working now
  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit,
        skip,
        sort
      }
    });

    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const task = await Task.findOne({ _id, owner: req.user._id });
  try {
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send("Task not found");
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//delete task

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send({ error: "Invalid id" });
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
