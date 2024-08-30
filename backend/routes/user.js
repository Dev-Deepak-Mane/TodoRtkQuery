import express from "express";
import {
  allUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/data", isAuthenticated, allUsers);
router.post("/logout", logout);

router.get("/profile", isAuthenticated, getMyProfile);

export default router;
