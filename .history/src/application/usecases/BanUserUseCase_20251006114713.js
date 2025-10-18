export default class BanUserUseCase {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(userId, banReason) {
    if (!userId) throw new Error("User ID is required");
    if (!banReason) throw new Error("Ban reason is required");

    return await this.adminRepository.banUser(userId, banReason);
  }
}
