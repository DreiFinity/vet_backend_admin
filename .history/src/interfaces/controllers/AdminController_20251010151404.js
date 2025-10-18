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
      res.status(401).json({ message: err.message });
    }
  }

  async signUp(req, res) {
    try {
      const { adminName, email, password, phoneNumber, address } = req.body;

      if (!adminName || !email || !password || !address) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const existingAdmin = await this.adminRepository.findByUsername(
        adminName
      );
      if (existingAdmin) {
        return res.status(400).json({ message: "Username already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await this.adminRepository.create({
        adminName,
        email,
        passwordHash: hashedPassword,
        phoneNumber,
        address,
      });

      return res.status(201).json(newAdmin);
    } catch (error) {
      console.error("❌ Signup Error:", error);
      res.status(500).json({ message: "Internal server error." });
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
