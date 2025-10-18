import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

export default function adminRoutes(adminController) {
  const router = express.Router();

  router.post("/signup", adminController.signup);
  router.post("/signin", adminController.signin);
  // ✅ Use controller method (no undefined import issue)
  router.put("/update", verifyToken, adminController.update);
  router.get("/me", verifyToken, adminController.getProfile);

  return router;
}
