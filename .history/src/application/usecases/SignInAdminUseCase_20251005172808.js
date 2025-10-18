import jwt from "jsonwebtoken";

export default class SignInAdmin {
  constructor(adminRepository, bcrypt) {
    this.adminRepository = adminRepository;
    this.bcrypt = bcrypt;
  }

  async execute({ email, password }) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw new Error("Admin not found");

    const validPassword = admin.verifyPassword(password, this.bcrypt);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: admin.userId, role: admin.role },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    return {
      token,
      admin_id: admin.id,
      admin_name: admin.adminName,
      email: admin.email,
      role: admin.role,
    };
  }
}
