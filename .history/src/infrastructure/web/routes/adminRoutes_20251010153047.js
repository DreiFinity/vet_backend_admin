// src/infrastructure/web/routes/adminRoutes.js
import express from "express";

const router = express.Router();

export default function adminRoutes(adminController) {
  router.post("/signup", adminController.signUp);
  router.post("/signin", adminController.signIn);
  router.put("/update/:adminId", adminController.updateAdmin);
  return router;
}
