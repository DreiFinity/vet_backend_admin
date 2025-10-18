// src/application/usecases/admin/UpdateAdminUseCase.js
import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { email, password, adminName }) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    let passwordHash = admin.passwordHash;
    if (password) {
      passwordHash = bcrypt.hashSync(password, 10);
    }

    return await this.adminRepository.update(adminId, {
      email,
      adminName,
      passwordHash,
    });
  }
}
