import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    if (!adminRepository) throw new Error("AdminRepository not provided");
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { oldPassword, password }) {
    // 1️⃣ Fetch admin by ID
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    // 2️⃣ Verify old password
    const valid = admin.verifyPassword(oldPassword, bcrypt);
    if (!valid) throw new Error("Old password is incorrect");

    // 3️⃣ Hash new password
    const passwordHash = bcrypt.hashSync(password, 10);

    // 4️⃣ Update password only
    return await this.adminRepository.update(adminId, { passwordHash });
  }
}
