// src/application/usecases/admin/UpdateAdminUseCase.js
import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute()");
    console.log("🟡 this.adminRepository:", this.adminRepository);
    console.log(
      "🟡 findById available?",
      typeof this.adminRepository?.findById
    );

    // ✅ Step 1: Find admin by ID
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // ✅ Step 2: Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ Step 3: Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 4: Update admin’s password
    await this.userRepository.update(user.userId, {
      passwordHash: hashedPassword,
    });

    return { message: "Password updated successfully" };
  }
}
