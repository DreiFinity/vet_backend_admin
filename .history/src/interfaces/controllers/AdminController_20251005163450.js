import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";

const adminRepo = new PostgresAdminRepository();

export default class AdminController {
  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await adminRepo.findByEmail(email);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, admin.password);
      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // ✅ Generate JWT
      const token = jwt.sign(
        { id: admin.id, role: admin.role },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1d" }
      );

      // ✅ Send full JSON response (expected by frontend)
      res.json({
        token,
        role: admin.role,
        admin_name: admin.name,
        user_id: admin.user_id,
        admin_id: admin.id,
      });
    } catch (err) {
      console.error("Sign-in error:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
}
