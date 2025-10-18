// src/interfaces/controllers/AdminController.js
import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";
import GetAdminProfileUseCase from "../../application/usecases/admin/GetAdminProfileUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    if (!adminRepository) throw new Error("AdminRepository not provided");
    this.adminRepository = adminRepository;

    // initialize use cases
    this.createAdminUseCase = new CreateAdminUseCase(adminRepository);
    this.signInAdminUseCase = new SignInAdminUseCase(adminRepository);
    this.updateAdminUseCase = new UpdateAdminUseCase(adminRepository);
    this.getAdminProfileUseCase = new GetAdminProfileUseCase(adminRepository);
  }

  signupAdmin = async (req, res) => {
    try {
      const admin = await this.createAdminUseCase.execute(req.body);
      res.status(201).json({ message: "Admin created", admin });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  signinAdmin = async (req, res) => {
    try {
      const result = await this.signInAdminUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  updateAdmin = async (req, res) => {
    try {
      const adminId = req.admin.id; // from verifyToken middleware
      const result = await this.updateAdminUseCase.execute(adminId, req.body);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  getAdminProfile = async (req, res) => {
    try {
      const adminId = req.admin.id;
      const admin = await this.getAdminProfileUseCase.execute(adminId);
      res.status(200).json(admin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}
