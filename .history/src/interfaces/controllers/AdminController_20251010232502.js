import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../domain/Entities/Admin.js"; // ✅ Correct relative path

// 🔹 Signup
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
      password: hashedPassword,
      address,
    });

    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
      admin: {
        id: newAdmin.id,
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

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Signin successful",
      token,
      admin: {
        id: admin.id,
        adminName: admin.adminName,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Signin failed" });
  }
};

// 🔹 Update Admin
export const updateAdmin = async (req, res) => {
  try {
    const adminId = req.admin.id;
    const { adminName, email, phoneNumber, password, address } = req.body;

    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : admin.password;

    await admin.update({
      adminName: adminName || admin.adminName,
      email: email || admin.email,
      phoneNumber: phoneNumber || admin.phoneNumber,
      password: hashedPassword,
      address: address || admin.address,
    });

    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Failed to update admin" });
  }
};

// 🔹 Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
