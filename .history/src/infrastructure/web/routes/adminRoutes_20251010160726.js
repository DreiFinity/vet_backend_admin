import express from "express";

export default function adminRoutes(adminController) {
  const router = express.Router();

  // Make sure all routes reference actual controller functions
  router.post("/signup", adminController.signUp); // ✅ POST /api/admin/signup
  router.post("/signin", adminController.signIn); // ✅ POST /api/admin/signin
  router.put("/update/:adminId", adminController.update); // ✅ PUT /api/admin/update/:adminId

  return router;
}
