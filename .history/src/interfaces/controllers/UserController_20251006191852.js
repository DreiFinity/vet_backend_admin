import UserRepository from "../../infrastructure/repositories/PostgresUserRepository.js";
import GetAllUsersUseCase from "../../application/usecases/user/GetAllUsersUseCase.js";
import GetPetOwnersUseCase from "../../application/usecases/user/GetPetOwnersUseCase.js";
import BanUserUseCase from "../../application/usecases/user/BanUserUseCase.js";
import GetBannedUsersUseCase from "../../application/usecases/user/GetBannedUsersUseCase.js";
import UnbanUserUseCase from "../../application/usecases/user/UnbanUserUseCase.js";

const userRepository = new UserRepository();

export default class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await new GetAllUsersUseCase(userRepository).execute();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getPetOwners(req, res) {
    try {
      const users = await new GetPetOwnersUseCase(userRepository).execute();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async banUser(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;
      const user = await new BanUserUseCase(userRepository).execute(id, reason);
      res.status(200).json({ message: "User banned", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getBannedUsers(req, res) {
    try {
      const users = await new GetBannedUsersUseCase(userRepository).execute();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async unbanUser(req, res) {
    try {
      const { id } = req.params;
      await new UnbanUserUseCase(userRepository).execute(id);
      res.status(200).json({ message: "User unbanned" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
