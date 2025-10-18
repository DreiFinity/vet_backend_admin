import CreateAdminUseCase from "../../application/usecases/admin/CreateAdminUseCase.js";
import SignInAdminUseCase from "../../application/usecases/admin/SignInAdminUseCase.js";
import UpdateAdminUseCase from "../../application/usecases/admin/UpdateAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    // ✅ store repository so use cases can use it
    this.adminRepository = adminRepository;

    // bind this context
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.update = this.update.bind(this);
  }

  async signUp(req, res) {
    try {
      const createAdminUseCase = new CreateAdminUseCase(this.adminRepository); // ✅ properly inject repo
      const admin = await createAdminUseCase.execute(req.body);
      res.status(201).json({
        message: "Admin registered successfully",
        admin,
      });
    } catch (error) {
      console.error("❌ Signup Error:", error);
      res.status(400).json({ message: error.message });
    }
  }

  async signIn(req, res) {
    try {
      const signInUseCase = new SignInAdminUseCase(this.adminRepository); // ✅ same
      const admin = await signInUseCase.execute(req.body);
      res.status(200).json({
        message: "Admin signed in successfully",
        admin,
      });
    } catch (error) {
      console.error("❌ Signin Error:", error);
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { adminId } = req.params;
      const updateAdminUseCase = new UpdateAdminUseCase(this.adminRepository); // ✅ same
      const result = await updateAdminUseCase.execute(adminId, req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error("❌ Update Error:", error);
      res.status(400).json({ message: error.message });
    }
  }
}
