import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository, userRepository) {
    this.adminRepository = adminRepository;
    this.userRepository = userRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    // ✅ Step 1: Find the admin record
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // ✅ Step 2: Find the corresponding user
    const user = await this.userRepository.findById(admin.user_id);
    if (!user) throw new Error("Linked user not found");

    // ✅ Step 3: Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("Old password is incorrect");

    // ✅ Step 4: Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 5: Update password in users table
    await this.userRepository.update(user.user_id, {
      password: hashedPassword,
    });

    return { message: "Password updated successfully" };
  }
}
