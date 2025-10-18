import bcrypt from "bcryptjs";
import SignInAdmin from "../../application/usecases/SignInAdminUseCase.js";

export default class AdminController {
  constructor(adminRepository) {
    this.signInAdmin = new SignInAdmin(adminRepository);
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.signInAdmin.execute(
        { email, password },
        bcrypt
      );
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}
