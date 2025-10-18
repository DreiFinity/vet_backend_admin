import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";

export default function adminRoutes(adminController) {
  const router = express.Router();

  router.post("/signup", adminController.signup);
  router.post("/signin", adminController.signin);
  router.put("/update", verifyToken, async (req, res) => {
    try {
      const updateUseCase = new UpdateAdminUseCase(
        adminController.adminRepository
      );
      const result = await updateUseCase.execute(req.admin.id, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  router.get("/me", verifyToken, adminController.getProfile);

  return router;
}
