// src/application/usecases/admin/UpdateAdminUseCase.js
import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository, userRepository = null) {
    this.adminRepository = adminRepository;
    // ✅ fallback if userRepository not given
    this.userRepository = userRepository || adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    console.log("🟡 ENTER execute()");
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");
    console.log("🟢 Admin found:", admin);

    // ✅ since we don’t have a separate userRepository, use adminRepository
    const user = await this.userRepository.findById(admin.userId);
    if (!user) throw new Error("Linked user not found");
    console.log("🟢 User found:", user);

    // ✅ FIXED: compare with passwordHash, not password
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ hash and update
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(user.userId, {
      passwordHash: hashedPassword,
    });

    console.log("✅ Password updated successfully for user:", user.userId);
    return { message: "Password updated successfully" };
  }
}
