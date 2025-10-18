export default class UnbanUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId) {
    return await this.userRepository.unbanUser(userId);
  }
}
