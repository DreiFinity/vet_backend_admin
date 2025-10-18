import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import UpdateAdminUseCase from "../../../application/usecases/admin/UpdateAdminUseCase.js";

export default function adminRoutes(adminController) {
  const router = express.Router();

  router.post("/signup", adminController.signup);
  router.post("/signin", adminController.signin);
  // ✅ Use controller method (no undefined import issue)
  router.put("/update", verifyToken, async (req, res) => {
    try {
      const adminId = req.admin?.id;
      const { oldPassword, password } = req.body;

      if (!adminId) return res.status(400).json({ message: "Missing adminId" });
      if (!oldPassword || !password)
        return res
          .status(400)
          .json({ message: "Old and new passwords required" });

      // ✅ Use the controller's repository
      const updateUseCase = new UpdateAdminUseCase(
        adminController.adminRepository
      );

      const result = await updateUseCase.execute(adminId, {
        oldPassword,
        password,
      });
      res.status(200).json(result);
    } catch (err) {
      console.error("🚨 /update error:", err);
      res.status(400).json({ message: err.message });
    }
  });

  router.get("/me", verifyToken, adminController.getProfile);

  return router;
}
