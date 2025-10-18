import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    if (!adminRepository) {
      throw new Error("❌ AdminRepository not provided to AdminController!");
    }

    this.adminRepository = adminRepository;

    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.update = this.update.bind(this);
  }

  async signUp(req, res) {
    try {
      const createAdminUseCase = new CreateAdminUseCase(this.adminRepository);
      const result = await createAdminUseCase.execute(req.body);
      res.status(201).json({ message: "✅ Admin created", result });
    } catch (err) {
      console.error("❌ Signup Error:", err);
      res.status(400).json({ message: err.message });
    }
  }

  async signIn(req, res) {
    try {
      const signInUseCase = new SignInAdminUseCase(this.adminRepository);
      const result = await signInUseCase.execute(req.body);
      res.status(200).json(result);
    } catch (err) {
      console.error("❌ Signin Error:", err);
      res.status(401).json({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const { adminId } = req.params;
      const updateAdminUseCase = new UpdateAdminUseCase(this.adminRepository);
      const result = await updateAdminUseCase.execute(adminId, req.body);
      res.status(200).json(result);
    } catch (err) {
      console.error("❌ Update Error:", err);
      res.status(400).json({ message: err.message });
    }
  }
}
