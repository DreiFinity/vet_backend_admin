import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute() with adminId:", adminId);

    // 1️⃣ Get admin
    const admin = await this.adminRepository.findById(adminId);
    console.log("🟢 Fetched admin:", admin);
    if (!admin) throw new Error("Admin not found");

    // 2️⃣ Validate old password
    if (!admin.passwordHash)
      throw new Error("Admin has no password field (DB mismatch)");
    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Update in users table
    await this.adminRepository.updateUserPassword(admin.userId, hashedPassword);

    return { message: "Password updated successfully" };
  }
}
