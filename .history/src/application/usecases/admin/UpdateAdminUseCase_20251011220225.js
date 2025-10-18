import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute() with adminId:", adminId);

    // 1️⃣ Get admin
    const admin = await this.adminRepository.findById(adminId);
    console.log("🟢 Fetched admin from repository:", admin);

    if (!admin) throw new Error("Admin not found");

    console.log("🔹 admin.passwordHash:", admin.passwordHash);
    console.log("🔹 oldPassword from request:", oldPassword);

    if (!admin.passwordHash) {
      throw new Error("❌ admin.passwordHash is undefined! Cannot compare");
    }

    // 2️⃣ Validate old password
    const isMatch = await bcrypt.compare(oldPassword, admin.passwordHash);
    console.log("🔹 isMatch:", isMatch);
    if (!isMatch) throw new Error("Old password is incorrect");

    // 3️⃣ Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Update in users table
    await this.adminRepository.updateUserPassword(admin.userId, hashedPassword);

    return { message: "Password updated successfully" };
  }
}
