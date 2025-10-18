import bcrypt from "bcryptjs";
import SignInAdmin from "../../application/usecases/SignInAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    this.signInUseCase = new SignInAdmin(adminRepository, bcrypt);
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const result = await this.signInUseCase.execute({ email, password });
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}
