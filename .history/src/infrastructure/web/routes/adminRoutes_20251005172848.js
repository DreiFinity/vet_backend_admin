import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();
const adminController = new AdminController();

router.post("/signin", (req, res) => adminController.signIn(req, res));

export default router;
