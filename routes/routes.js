import express from "express";
const router = express.Router();
import {
  deleteUserById,
  getUser,
  getUserById,
  postUser,
  updateUserById,
} from "../controllers/controllers.js";

//all routes here
router.get("/", getUser);
router.post("/", postUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUserById);
router.delete("/delete/:id", deleteUserById);

export default router;
