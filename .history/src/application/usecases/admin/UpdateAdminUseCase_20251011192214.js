// src/application/usecases/admin/UpdateAdminUseCase.js
import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    // ✅ 1. Find admin by ID
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // ✅ 2. Check old password
    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ 3. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ 4. Update using adminRepository (it handles both users & admins)
    await this.adminRepository.update(adminId, {
      passwordHash: hashedPassword,
    });

    return { message: "Password updated successfully" };
  }
}
