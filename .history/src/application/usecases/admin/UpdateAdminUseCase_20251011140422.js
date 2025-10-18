import bcrypt from "bcryptjs";

export default class UpdateAdminUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId, { password, adminName, email }) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");

    const updateData = {};

    // Update password if provided
    if (password) {
      updateData.passwordHash = bcrypt.hashSync(password, 10);
    }

    // Update adminName/email only if provided
    if (adminName) updateData.adminName = adminName;
    if (email) updateData.email = email;

    // If nothing to update, throw error
    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }

    return await this.adminRepository.update(adminId, updateData);
  }
}
