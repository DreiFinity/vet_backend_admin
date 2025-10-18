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
      console.log("🟡 === /update request received ===");

      // 1️⃣ JWT info
      const adminId = req.admin?.id;
      const adminRole = req.admin?.role;
      console.log("JWT decoded adminId:", adminId);
      console.log("JWT decoded role:", adminRole);

      if (!adminId) return res.status(400).json({ message: "Missing adminId" });

      const { oldPassword, password } = req.body;
      console.log("Request body:", req.body);

      if (!oldPassword || !password)
        return res
          .status(400)
          .json({ message: "Old and new passwords required" });

      // 2️⃣ Fetch admin from repository
      const adminRepo = req.adminRepository || req.app.get("adminRepository"); // Make sure you have a reference
      const admin = await adminRepo.findById(adminId);
      console.log("Fetched admin from DB:", admin);
      console.log("admin.passwordHash:", admin?.passwordHash);

      if (!admin || !admin.passwordHash) {
        return res.status(400).json({ message: "Admin or password not found" });
      }

      // 3️⃣ Compare old password
      const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
      console.log("Old password match:", isMatch);
      if (!isMatch)
        return res.status(400).json({ message: "Old password incorrect" });

      // 4️⃣ Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("New hashed password:", hashedPassword);

      // 5️⃣ Update password in DB
      await adminRepo.updateUserPassword(admin.userId, hashedPassword);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      console.error("🚨 /update error:", err);
      res.status(500).json({ message: err.message });
    }
  });

  router.get("/me", verifyToken, adminController.getProfile);

  return router;
}
