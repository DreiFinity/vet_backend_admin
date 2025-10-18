import express from "express";
import { loginAdmin } from "../../interfaces/controllers/AdminController.js";

const router = express.Router();

router.post("/signin", loginAdmin);

export default router;
