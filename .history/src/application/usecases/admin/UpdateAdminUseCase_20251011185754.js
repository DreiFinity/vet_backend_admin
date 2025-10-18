import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository, userRepository) {
    this.adminRepository = adminRepository;
    this.userRepository = userRepository;
  }

  async execute(adminId, { oldPassword, newPassword }) {
    // ✅ Step 1: Find admin record
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // ✅ Step 2: Find corresponding user
    const user = await this.userRepository.findById(admin.userId);
    if (!user) throw new Error("Linked user not found");

    // ✅ Step 3: Compare old password with hashed password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ Step 4: Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // ✅ Step 5: Update password in users table only
    await this.userRepository.update(user.userId, { password: hashedPassword });

    return { message: "Password updated successfully" };
  }
}
