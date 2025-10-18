import express from "express";
import AdminController from "../../interfaces/controllers/AdminController.js";

const router = express.Router();
const adminController = new AdminController();

// ✅ Sign-in route
router.post("/signin", (req, res) => adminController.signIn(req, res));

export default router;
