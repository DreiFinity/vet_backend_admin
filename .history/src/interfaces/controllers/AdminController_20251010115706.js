import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    this.signInUseCase = new SignInAdminUseCase(adminRepository);
    this.createAdminUseCase = new CreateAdminUseCase(adminRepository);
    this.updateAdminUseCase = new UpdateAdminUseCase(adminRepository);
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const data = await this.signInUseCase.execute({ email, password });
      res.json(data);
    } catch (err) {
      console.error("Sign-in error:", err.message);
      res.status(401).json({ message: err.message });
    }
  }

  async signUp(req, res) {
    const { adminName, email, password, role } = req.body;

    try {
      const data = await this.createAdminUseCase.execute({
        adminName,
        email,
        password,
        role,
      });
      res.status(201).json(data);
    } catch (err) {
      console.error("Sign-up error:", err.message);
      res.status(400).json({ message: err.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { email, password, adminName } = req.body;

    try {
      const data = await this.updateAdminUseCase.execute(id, {
        email,
        password,
        adminName,
      });
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
