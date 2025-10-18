import SignInAdminUseCase from "../../application/usecases/SignInAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    this.signInUseCase = new SignInAdminUseCase(adminRepository);
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
}
