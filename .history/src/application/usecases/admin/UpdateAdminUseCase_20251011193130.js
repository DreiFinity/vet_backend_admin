import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    // ✅ Find the admin (this includes user info already)
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // ✅ Compare old password
    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Update password in same repository (updates both admin + user)
    await this.adminRepository.update(adminId, {
      passwordHash: hashedPassword,
    });

    return { message: "Password updated successfully" };
  }
}
