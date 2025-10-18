export default class UserController {
  constructor(banUserUseCase, userRepository) {
    this.banUserUseCase = banUserUseCase;
    this.userRepository = userRepository;
  }

  async banUser(req, res) {
    try {
      const { userId } = req.params;
      const result = await this.banUserUseCase.execute(userId);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
