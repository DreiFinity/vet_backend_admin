import bcrypt from "bcryptjs";

export default class CreateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute({ adminName, email, password, phoneNumber, address }) {
    // ✅ make sure repository exists
    if (!this.adminRepository)
      throw new Error("AdminRepository is not initialized");

    const existingAdmin = await this.adminRepository.findByUsername(adminName);
    if (existingAdmin) throw new Error("Admin username already exists");

    const existingEmail = await this.adminRepository.findByEmail(email);
    if (existingEmail) throw new Error("Email already exists");

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.adminRepository.create({
      adminName,
      email,
      passwordHash,
      phoneNumber,
      address,
    });
  }
}
