import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../../domain/Entities/Admin.js"; // adjust import if needed

// 🔹 Signup (auto-login after register)
export const signupAdmin = async (req, res) => {
  try {
    const { adminName, email, password, phoneNumber, address } = req.body;

    // Check if email exists
    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await Admin.create({
      adminName,
      email,
      phoneNumber,
      password: hashedPassword,
      address,
    });

    // Generate token (auto-login)
    const token = jwt.sign(
      { id: newAdmin.id, email: newAdmin.email, adminName: newAdmin.adminName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Admin account created successfully",
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
      { id: admin.id, email: admin.email, adminName: admin.adminName },
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
    const adminId = req.admin.id; // ✅ comes from verified token
    const { adminName, email, phoneNumber, password, address } = req.body;

    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // If password is being changed, hash it
    let updatedPassword = admin.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Update fields
    admin.adminName = adminName || admin.adminName;
    admin.email = email || admin.email;
    admin.phoneNumber = phoneNumber || admin.phoneNumber;
    admin.password = updatedPassword;
    admin.address = address || admin.address;

    await admin.save();

    res.status(200).json({
      message: "✅ Admin profile updated successfully",
      admin: {
        id: admin.id,
        adminName: admin.adminName,
        email: admin.email,
        phoneNumber: admin.phoneNumber,
        address: admin.address,
      },
    });
  } catch (error) {
    console.error("Update admin error:", error);
    res.status(500).json({ message: "Failed to update admin" });
  }
};

// 🔹 Fetch logged-in admin info
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({
      id: admin.id,
      adminName: admin.adminName,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      address: admin.address,
    });
  } catch (error) {
    console.error("Fetch admin profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
