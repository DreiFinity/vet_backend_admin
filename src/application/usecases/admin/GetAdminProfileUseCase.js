// src/application/usecases/admin/GetAdminProfileUseCase.js
export default class GetAdminProfileUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error("Admin not found");
    return admin;
  }
}
