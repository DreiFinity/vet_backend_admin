import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";
import GetAdminProfileUseCase from "../../application/usecases/admin/GetAdminProfileUseCase.js";
import jwt from "jsonwebtoken";

export default class AdminController {
  constructor(adminRepository) {
    if (!adminRepository) throw new Error("AdminRepository not provided");

    this.adminRepository = adminRepository; // ✅ store it

    this.createAdminUseCase = new CreateAdminUseCase(adminRepository);
    this.signInAdminUseCase = new SignInAdminUseCase(adminRepository);
    this.updateAdminUseCase = new UpdateAdminUseCase(adminRepository);
    this.getAdminProfileUseCase = new GetAdminProfileUseCase(adminRepository);
  }

  signup = async (req, res) => {
    try {
      const admin = await this.createAdminUseCase.execute(req.body);

      // ✅ Generate JWT token immediately after signup
      const token = jwt.sign(
        { id: admin.adminId, role: admin.role },
        process.env.JWT_SECRET || "andrei",
        { expiresIn: "24h" }
      );

      res.status(201).json({
        message: "Admin created",
        admin,
        token, // ✅ send token here
      });
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
      const adminId = req.admin.id;
      const { oldPassword, password } = req.body;

      if (!oldPassword || !password)
        return res
          .status(400)
          .json({ message: "Old and new passwords are required" });

      const result = await this.updateAdminUseCase.execute(adminId, {
        oldPassword,
        password,
      });

      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  // ✅ Get current admin profile
  getProfile = async (req, res) => {
    try {
      const admin = await this.adminRepository.findById(req.admin.id);
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      res.status(200).json(admin);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch admin profile" });
    }
  };
}
