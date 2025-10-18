import bcrypt from "bcryptjs";

export default class CreateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute({ adminName, email, password, role }) {
    const existing = await this.adminRepository.findByEmail(email);
    if (existing) throw new Error("Email already exists");

    const passwordHash = bcrypt.hashSync(password, 10);

    return await this.adminRepository.create({
      adminName,
      email,
      passwordHash,
      role,
    });
  }
}
