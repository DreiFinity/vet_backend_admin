import jwt from "jsonwebtoken";

export default class SignInAdmin {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute({ email, password }, bcrypt) {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) throw new Error("Admin not found");

    const validPassword = admin.verifyPassword(password, bcrypt);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      admin_id: admin.id,
      email: admin.email,
      role: admin.role,
    };
  }
}
