import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.adminRepository.update(adminId, {
      password: hashedPassword,
    });
  }
}
