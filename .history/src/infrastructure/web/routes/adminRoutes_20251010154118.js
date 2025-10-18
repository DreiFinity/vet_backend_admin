import express from "express";

export default function adminRoutes(adminController) {
  const router = express.Router();
  router.post("/signup", adminController.signUp);
  router.post("/signin", adminController.signIn);
  router.put("/update/:adminId", adminController.updateAdmin);
  return router;
}
