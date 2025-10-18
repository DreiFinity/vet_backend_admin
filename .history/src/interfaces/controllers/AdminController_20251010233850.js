import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../../../domain/Entities/Admin.js";

// 🔹 Signup (auto-login after register)
export const signupAdmin = async (req, res) => {
  try {
    const { adminName, email, password, phoneNumber, address } = req.body;

    const existing = await Admin.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      adminName,
      email,
      phoneNumber,
      passwordHash: hashedPassword,
      address,
    });

    const token = jwt.sign(
      {
        id: newAdmin.adminId,
        email: newAdmin.email,
        adminName: newAdmin.adminName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin account created successfully",
      token,
      admin: {
        id: newAdmin.adminId,
        adminName: newAdmin.adminName,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

// 🔹 Signin
export const signinAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // Use entity's verifyPassword
    if (!admin.verifyPassword(password, bcrypt)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.adminId, email: admin.email, adminName: admin.adminName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signin successful",
      token,
      admin: {
        id: admin.adminId,
        adminName: admin.adminName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Signin failed" });
  }
};

// 🔹 Update admin
export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.admin.id; // comes from verified token
    const { adminName, email, password, address } = req.body;

    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    let updatedPassword = admin.passwordHash;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    admin.adminName = adminName || admin.adminName;
    admin.email = email || admin.email;
    admin.passwordHash = updatedPassword;
    admin.address = address || admin.address;

    await admin.save();

    res.status(200).json({
      message: "✅ Admin profile updated successfully",
      admin: {
        id: admin.adminId,
        adminName: admin.adminName,
        email: admin.email,
        address: admin.address,
      },
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Failed to update admin" });
  }
};

// 🔹 Get logged-in admin info
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({
      id: admin.adminId,
      adminName: admin.adminName,
      email: admin.email,
      address: admin.address,
    });
  } catch (error) {
    console.error("Fetch admin profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
