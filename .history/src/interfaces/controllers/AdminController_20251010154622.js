import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";

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
      const newAdmin = await this.createAdminUseCase.execute({
        adminName,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json(newAdmin);
    } catch (err) {
      console.error("❌ Signup Error:", err);
      res.status(400).json({ message: err.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const data = await this.signInUseCase.execute({ email, password });
      res.status(200).json(data);
    } catch (err) {
      console.error("❌ Signin Error:", err);
      res.status(401).json({ message: err.message });
    }
  }

  async updateAdmin(req, res) {
    try {
      const { adminId } = req.params;
      const updateData = req.body;
      const data = await this.updateAdminUseCase.execute(adminId, updateData);
      res.status(200).json(data);
    } catch (err) {
      console.error("❌ Update Error:", err);
      res.status(400).json({ message: err.message });
    }
  }
}
