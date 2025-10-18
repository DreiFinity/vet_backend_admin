import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute() with adminId:", adminId);

    // 1️⃣ Find the admin and linked user info
    const admin = await this.adminRepository.findById(adminId);
    console.log("🟢 Fetched admin:", admin);
    if (!admin) throw new Error("Admin not found");
    console.log("🟢 Admin found:", admin);

    // 2️⃣ Compare old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Update password in users table
    await this.adminRepository.updateUserPassword(admin.userId, hashedPassword);
    console.log("✅ Admin object in UpdateAdminUseCase:", admin);

    return { message: "Password updated successfully" };
  }
}
