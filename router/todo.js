const router = require("express").Router();
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

//Create Todo
router.post("/create", auth, async (req, res) => {
  try {
    const body = {
      title: req.body.title,
      completed: req.body.completed,
      owner: req.user._id,
    };
    const todo = await Todo.create(body);
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

//  Get all Todo
router.get("/getall", auth, async (req, res) => {
  try {
    const todo = await Todo.find({ owner: req.user._id });
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

//  Get Todo
router.get("/get/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.find({ owner: req.user._id, _id: req.params.id });
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

//  Delete todo
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    // const todo = await Todo.find({owner: req.user._id, _id: req.params.id})
    const todo = await Todo.findOneAndDelete({
      owner: req.user._id,
      _id: req.params.id,
    });
    res.send("Deleted");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});
//  Edit Todo
router.patch("/edit/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ owner: req.user._id, _id: req.params.id });
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.completed) {
      todo.completed = req.body.completed;
    }
    await todo.save();
    res.send(todo);
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

module.exports = router;
