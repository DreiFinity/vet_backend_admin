import express from "express";
import AuthController from "../../interfaces/controllers/AuthController.js";

const router = express.Router();
const authController = new AuthController();

router.post("/signin", (req, res) => authController.signIn(req, res));

export default router;
