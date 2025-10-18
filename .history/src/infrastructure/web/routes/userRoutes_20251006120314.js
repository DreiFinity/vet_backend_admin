import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/ban", UserController.banUser);

export default router;
