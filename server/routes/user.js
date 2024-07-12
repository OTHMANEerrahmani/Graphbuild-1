import express from "express";
import {
  deleteUser,
  getAllSubscribesUsers,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/subscriber", getAllSubscribesUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
