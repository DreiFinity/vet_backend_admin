import express from "express";

export default function adminRoutes(adminController) {
  const router = express.Router();

  // ✅ This is correct
  router.post("/signin", adminController.signIn);

  return router;
}
