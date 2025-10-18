import bcrypt from "bcryptjs";
export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    if (!adminRepository) throw new Error("AdminRepository not provided");
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute() with adminId:", adminId);

    const admin = await this.adminRepository.findById(adminId); // ✅ now defined
    if (!admin) throw new Error("Admin not found");

    if (!admin.passwordHash) throw new Error("Admin has no password");

    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.adminRepository.updateUserPassword(admin.userId, hashedPassword);

    return { message: "Password updated successfully" };
  }
}
