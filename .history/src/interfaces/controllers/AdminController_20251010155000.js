// src/interfaces/controllers/AdminController.js
import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";
import bcrypt from "bcryptjs";

export default class AdminController {
  constructor(adminRepository) {
    this.createAdminUseCase = new CreateAdminUseCase(adminRepository);
    this.signInUseCase = new SignInAdminUseCase(adminRepository);
    this.updateAdminUseCase = new UpdateAdminUseCase(adminRepository);

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
  }

  async signUp(req, res) {
    try {
      const { adminName, email, password, phoneNumber, address } = req.body;

      if (
        !adminName ||
        !email ||
        !password ||
        !address ||
        !address.street ||
        !address.city
      ) {
        return res
          .status(400)
          .json({
            message:
              "Missing required fields: adminName, email, password, address.street, address.city",
          });
      }

      const newAdmin = await this.createAdminUseCase.execute({
        adminName,
        email,
        password,
        phoneNumber,
        address,
      });
      // Do not return passwordHash to client
      const { passwordHash, ...safe } = newAdmin;
      res.status(201).json(safe);
    } catch (err) {
      console.error("❌ Signup Error:", err);
      res.status(400).json({ message: err.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ message: "Email & password required" });

      const data = await this.signInUseCase.execute({ email, password });
      // return token and safe admin info
      const { token, admin } = data;
      const { passwordHash, ...safeAdmin } = admin;
      res.status(200).json({ token, admin: safeAdmin });
    } catch (err) {
      console.error("❌ Signin Error:", err);
      res.status(401).json({ message: err.message });
    }
  }

  async updateAdmin(req, res) {
    try {
      const { adminId } = req.params;
      const { adminName, email, password } = req.body;

      const data = await this.updateAdminUseCase.execute(adminId, {
        adminName,
        email,
        password,
      });
      res.status(200).json(data);
    } catch (err) {
      console.error("❌ Update Error:", err);
      res.status(400).json({ message: err.message });
    }
  }
}
