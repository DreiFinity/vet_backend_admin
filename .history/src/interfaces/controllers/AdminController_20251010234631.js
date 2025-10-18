// src/interfaces/controllers/AdminController.js
import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    this.createAdminUseCase = new CreateAdminUseCase(adminRepository);
    this.signInAdminUseCase = new SignInAdminUseCase(adminRepository);
    this.updateAdminUseCase = new UpdateAdminUseCase(adminRepository);
    this.getAdminProfileUseCase = new GetAdminProfileUseCase(adminRepository);
  }

  signup = async (req, res) => {
    try {
      const admin = await this.createAdminUseCase.execute(req.body);
      res.status(201).json({ message: "✅ Admin created", admin });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  signin = async (req, res) => {
    try {
      const result = await this.signInAdminUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  update = async (req, res) => {
    try {
      const result = await this.updateAdminUseCase.execute(
        req.admin.id,
        req.body
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getProfile = async (req, res) => {
    try {
      const admin = await this.getAdminProfileUseCase.execute(req.admin.id);
      res.status(200).json(admin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}
