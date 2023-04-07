const express = require("express");
const router = new express.Router();
const User = require("../models/users");
const auth = require("../middlewares/auth");
const multer = require("multer");
const sharp= require('sharp');
const {sendWelcomeMail, sendCancellationMail} = require('../emails/account')

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeMail(user.email,user.name);
    const token = await user.generateToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const user = await User.findById(_id);
  try {
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findBycredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send();
  }
});

//logout from single session
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//logout from all devices
router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

//update user
router.patch("/users/me", auth, async (req, res) => {
  const _id = req.user._id;
  const allowedUpdates = ["name", "email", "age", "password"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  //findByidAndUpdate directly chnages the databse values so to run middleware change to findBYId
  // const user = await User.findById(_id);

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});
//delete user
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    await req.user.remove();
    sendCancellationMail(req.user.email,req.user.name);
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//add file limitation for size or type of file
const uplaod = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("PLease add jpg or png file"));
    }
    cb(undefined, true); //cb takes first argument if there is error else it is undefined and second argument true means file is allowed
  },
});
//uplaod file
router.post(
  "/users/me/avatar",
  auth,
  uplaod.single("avatar"),
  async (req, res) => {
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {//this will execute if any error to file upload
    res.status(400).send({ error: error.message });
  }
);

//delete avatar
router.delete('/users/me/avatar',auth,async(req,res)=>{
  req.user.avatar=undefined;
  await req.user.save();
  res.send();
})

//get user image
router.get('/users/:id/avatar',async(req,res)=>{
  try{
    const user=await User.findById(req.params.id);
    if(!user || !user.avatar){
      throw new Error("Image not found")
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar);
  }catch(e){
    res.status(404).send()
  }
})
module.exports = router;
