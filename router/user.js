const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth")

//  Create User
router.post("/create", async (req, res) => {
  try {
    const body = {
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };
    const user = await User.create(body);
    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.send({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//  login User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.send("User Not Found");
    if (!(await bcrypt.compare(req.body.password, user.password)))
      return res.send("Wrong Credentials");

    const token = jwt.sign({ id: user._id }, process.env.SECRET);
    res.send({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//  Get User
router.get("/get/me", auth, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id});
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//  Edit User
router.patch("/edit", auth, async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id})
    if(req.body.username){
      user.username = req.body.username
    }
    if(req.body.email){
      user.email = req.body.email
    }
    if(req.body.password){
      user.password = await bcrypt.hash(req.body.password, 10)
    }
    await user.save()
    res.send(user)

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

//  Delete User
router.delete("/delete", auth, async (req, res) => {
  try {
    const userF = await User.findById(req.user._id);
    if (!userF) return res.send("User not Found");
    const user = await User.findByIdAndDelete(req.user._id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
