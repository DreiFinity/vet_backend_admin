import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute()");

    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");
    console.log("🟢 Admin found:", admin);

    // ✅ Compare old password with current hash
    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ Hash new password and update directly in admin table
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.adminRepository.updatePassword(adminId, hashedPassword);

    console.log("✅ Admin password updated successfully");
    return { message: "Password updated successfully" };
  }
}
