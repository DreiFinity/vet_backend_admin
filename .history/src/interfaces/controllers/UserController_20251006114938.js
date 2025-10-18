import BanUserUseCase from "../../application/usecases/BanUserUseCase.js";

export default class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // other methods...

  async banUser(req, res) {
    try {
      const { userId, reason } = req.body;
      const useCase = new BanUserUseCase(this.userRepository);

      const result = await useCase.execute(userId, reason);

      res.status(200).json({
        message: "User banned successfully",
        user: result,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
