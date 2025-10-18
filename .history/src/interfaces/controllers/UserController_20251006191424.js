import GetAllUsersUseCase from "../../application/usecases/user/GetAllUsersUseCase.js";
import GetPetOwnersUseCase from "../../application/usecases/user/GetPetOwnersUseCase.js";
import BanUserUseCase from "../../application/usecases/user/BanUserUseCase.js";
import GetBannedUsersUseCase from "../../application/usecases/user/GetBannedUsersUseCase.js";
import UnbanUserUseCase from "../../application/usecases/user/UnbanUserUseCase.js";
import UserRepository from "../../infrastructure/repositories/PostgresUserRepository.js";

const userRepository = new UserRepository();

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const useCase = new GetAllUsersUseCase(userRepository);
      const users = await useCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching all users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async getPetOwners(req, res) {
    try {
      const useCase = new GetPetOwnersUseCase(userRepository);
      const users = await useCase.execute();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching pet owners:", error);
      res.status(500).json({ error: "Failed to fetch pet owners" });
    }
  }

  static async banUser(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const useCase = new BanUserUseCase(userRepository);
      const user = await useCase.execute(id, reason);
      res.status(200).json({ message: "User banned successfully", user });
    } catch (error) {
      console.error("Error banning user:", error);
      res.status(500).json({ error: "Failed to ban user" });
    }
  }

  static async getBannedUsers(req, res) {
    try {
      const useCase = new GetBannedUsersUseCase(userRepository);
      const bannedUsers = await useCase.execute();
      res.status(200).json(bannedUsers);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch banned users" });
    }
  }

  static async unbanUser(req, res) {
    try {
      const { id } = req.params;
      const useCase = new UnbanUserUseCase(userRepository);
      await useCase.execute(id);
      res.status(200).json({ message: "User unbanned successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to unban user" });
    }
  }
}
