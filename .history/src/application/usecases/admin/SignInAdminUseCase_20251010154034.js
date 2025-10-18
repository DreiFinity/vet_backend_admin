import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default class SignInAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute({ email, password }) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw new Error("Admin not found");

    const validPassword = await admin.verifyPassword(password, bcrypt);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: admin.adminId, role: admin.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return { token, admin };
  }
}
