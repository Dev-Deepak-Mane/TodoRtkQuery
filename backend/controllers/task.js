import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    // Create the task
    const task = await Task.create({
      title,
      description,
      user: req.user,
    });

    // Return the full task object in the response
    res.status(201).json({
      success: true,
      message: "Task added Successfully",
      task, // Return the entire created task object
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.completed =
      req.body.completed !== undefined ? req.body.completed : task.completed;

    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// edited  a task
export const TaskEditing = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    // edited task fields
    if (req.body.title !== undefined) {
      task.title = req.body.title;
    }
    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }

    const editedTask = await task.save();
    res.json({ message: "Task is Updated", editedTask });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
