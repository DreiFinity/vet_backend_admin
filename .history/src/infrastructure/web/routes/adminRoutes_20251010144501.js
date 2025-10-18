import express from "express";

export default function adminRoutes(adminController) {
  const router = express.Router();

  router.post("/signin", (req, res) => adminController.signIn(req, res));
  router.post("/signup", (req, res) => adminController.signUp(req, res));
  router.put("/update/:id", (req, res) => adminController.update(req, res));

  return router;
}
