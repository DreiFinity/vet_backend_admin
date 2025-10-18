// src/interfaces/controllers/AdminController.js
import bcrypt from "bcrypt";

export default class AdminController {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;

    // Bind methods to keep `this` context
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
    this.updateAdmin = this.updateAdmin.bind(this);
  }

  async signUp(req, res) {
    try {
      const { adminName, email, password, phoneNumber, address } = req.body;

      if (!adminName || !email || !password || !address) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      // Check if admin already exists
      const existingAdmin = await this.adminRepository.findByUsername(
        adminName
      );
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await this.adminRepository.create({
        adminName,
        email,
        passwordHash: hashedPassword,
        phoneNumber,
        address,
      });

      res.status(201).json(newAdmin);
    } catch (error) {
      console.error("❌ Signup Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) return res.status(404).json({ message: "Admin not found" });

      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      res.status(200).json(admin);
    } catch (error) {
      console.error("❌ Signin Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }

  async updateAdmin(req, res) {
    try {
      const { adminId } = req.params;
      const updateData = req.body;
      const updatedAdmin = await this.adminRepository.update(
        adminId,
        updateData
      );
      res.status(200).json(updatedAdmin);
    } catch (error) {
      console.error("❌ Update Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
}
