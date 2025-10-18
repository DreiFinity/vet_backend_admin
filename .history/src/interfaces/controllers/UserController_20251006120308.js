import GetAllUsersUseCase from "../../application/usecases/GetAllUsersUseCase.js";
import BanUserUseCase from "../../application/usecases/BanUserUseCase.js";
import UserRepository from "../../infrastructure/repositories/UserRepository.js";

const userRepository = new UserRepository();

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const useCase = new GetAllUsersUseCase(userRepository);
      const users = await useCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async banUser(req, res) {
    try {
      const { userId, reason } = req.body;
      const useCase = new BanUserUseCase(userRepository);
      const user = await useCase.execute(userId, reason);
      res.status(200).json({ message: "User banned successfully", user });
    } catch (error) {
      console.error("Error banning user:", error);
      res.status(500).json({ error: "Failed to ban user" });
    }
  }
}
