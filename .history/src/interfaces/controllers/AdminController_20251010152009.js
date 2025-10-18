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

      // 1️⃣ Validate required fields
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
          .json({ message: "All required fields must be provided." });
      }

      // 2️⃣ Check for existing admin by username or email
      const existingAdmin = await this.adminRepository.findByUsername(
        adminName
      );
      if (existingAdmin) {
        return res
          .status(400)
          .json({ message: "Admin username already exists." });
      }

      // Optional: check email in users table separately if needed

      // 3️⃣ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 4️⃣ Create admin with address
      const newAdmin = await this.adminRepository.create({
        adminName,
        email,
        passwordHash: hashedPassword,
        phoneNumber,
        address,
      });

      return res.status(201).json(newAdmin);
    } catch (err) {
      console.error("❌ Signup Error:", err.message, err.stack);
      res.status(500).json({ message: err.message });
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
