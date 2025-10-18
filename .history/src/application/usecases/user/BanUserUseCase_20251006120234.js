export default class BanUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId, reason) {
    if (!userId || !reason) {
      throw new Error("User ID and reason are required");
    }
    return await this.userRepository.banUser(userId, reason);
  }
}
