// src/infrastructure/web/routes/adminRoutes.js
import express from "express";
import AdminController from "../../../interfaces/controllers/AdminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export default function adminRoutes(adminRepository) {
  const router = express.Router();
  const controller = new AdminController(adminRepository);

  router.post("/signup", controller.signup);
  router.post("/signin", controller.signin);
  router.put("/update", verifyToken, controller.update);
  router.get("/me", verifyToken, controller.getProfile);

  return router;
}
