// src/application/usecases/admin/SignInAdminUseCase.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // ✅ Use import instead of require

export default class SignInAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute({ email, password }) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw new Error("Admin not found");

    // ✅ Pass bcrypt to your entity’s verifyPassword method
    const validPassword = admin.verifyPassword(password, bcrypt);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: admin.adminId, role: admin.role },
      process.env.JWT_SECRET || "andrei",
      { expiresIn: "24h" }
    );

    return { message: "✅ Login successful", token, admin };
  }
}
