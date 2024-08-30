import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  TaskEditing,
  updateTask,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, newTask);
router.get("/", isAuthenticated, getMyTask);
router.put("/:id", isAuthenticated, TaskEditing);
router.patch("/:id", isAuthenticated, updateTask);

router.delete("/:id", isAuthenticated, deleteTask);

export default router;
