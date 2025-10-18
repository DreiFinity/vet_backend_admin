import bcrypt from "bcryptjs";
import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import SignInAdmin from "../../application/usecases/SignInAdminUseCase.js";

const adminRepo = new PostgresAdminRepository();
const signInAdmin = new SignInAdmin(adminRepo, bcrypt);

export default class AdminController {
  async signIn(req, res) {
    const { email, password } = req.body;

    try {
      const result = await signInAdmin.execute({ email, password });
      res.json(result);
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }
}
