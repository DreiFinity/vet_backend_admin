export default class BanUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("User not found");

    await this.userRepository.banUser(userId);
    return { message: `User ${userId} has been banned.` };
  }
}
