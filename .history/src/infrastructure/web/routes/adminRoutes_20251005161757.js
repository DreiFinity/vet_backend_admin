import express from "express";

export default function adminRoutes(adminController) {
  const router = express.Router();

  // ✅ Correct
  router.post("/signin", (req, res) => adminController.signIn(req, res));

  return router;
}
