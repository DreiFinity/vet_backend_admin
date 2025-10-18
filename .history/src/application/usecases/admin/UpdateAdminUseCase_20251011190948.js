// src/application/usecases/admin/UpdateAdminUseCase.js
import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository, userRepository = null) {
    this.adminRepository = adminRepository;
    // ✅ If userRepository not provided, use adminRepository as fallback
    this.userRepository = userRepository || adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    const user = await this.userRepository.findById(admin.userId);
    if (!user) throw new Error("Linked user not found");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userRepository.update(user.userId, { password: hashedPassword });

    return { message: "Password updated successfully" };
  }
}
