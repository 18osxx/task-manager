const Task = require("../models/Task");

const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      userId: req.user.id,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, status },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndRemove(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
