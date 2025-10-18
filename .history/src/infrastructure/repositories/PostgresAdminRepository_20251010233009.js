// src/infrastructure/repositories/PostgresAdminRepository.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail(email) {
    const q = `
      SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      WHERE u.email = $1
      LIMIT 1
    `;
    const result = await this.db.query(q, [email]);
    if (!result.rows.length) return null;
    const r = result.rows[0];
    return new Admin({
      adminId: r.admin_id,
      userId: r.user_id,
      adminName: r.admin_name,
      email: r.email,
      role: r.role,
      passwordHash: r.password,
    });
  }

  async findById(adminId) {
    const q = `
      SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.admin_id = $1
      LIMIT 1
    `;
    const result = await this.db.query(q, [adminId]);
    if (!result.rows.length) return null;
    const r = result.rows[0];
    return new Admin({
      adminId: r.admin_id,
      userId: r.user_id,
      adminName: r.admin_name,
      email: r.email,
      role: r.role,
      passwordHash: r.password,
    });
  }

  async create({ adminName, email, passwordHash, phoneNumber, address }) {
    const client = await this.db.connect();
    try {
      await client.query("BEGIN");

      const addrQ = `
        INSERT INTO addresses (street, city, province, postal_code, country, unit_number, latitude, longitude)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING address_id
      `;
      const addrVals = [
        address.street,
        address.city,
        address.province || null,
        address.postal_code || null,
        address.country || null,
        address.unit_number || null,
        address.latitude || null,
        address.longitude || null,
      ];
      const addrRes = await client.query(addrQ, addrVals);
      const addressId = addrRes.rows[0].address_id;

      const userQ = `INSERT INTO users (email, password, role) VALUES ($1,$2,'admin') RETURNING user_id`;
      const userRes = await client.query(userQ, [email, passwordHash]);
      const userId = userRes.rows[0].user_id;

      const adminQ = `INSERT INTO admins (user_id, admin_name, phone_number, address_id) VALUES ($1,$2,$3,$4) RETURNING admin_id, admin_name`;
      const adminRes = await client.query(adminQ, [
        userId,
        adminName,
        phoneNumber || null,
        addressId,
      ]);

      await client.query("COMMIT");

      return new Admin({
        adminId: adminRes.rows[0].admin_id,
        userId,
        adminName: adminRes.rows[0].admin_name,
        email,
        role: "admin",
        passwordHash,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("PostgresAdminRepository.create error:", err);
      throw err;
    } finally {
      client.release();
    }
  }

  async update(
    adminId,
    { adminName, email, passwordHash, phoneNumber, addressId }
  ) {
    const adminResult = await this.db.query(
      `UPDATE admins 
       SET admin_name = $1, phone_number = COALESCE($2, phone_number), address_id = COALESCE($3, address_id) 
       WHERE admin_id = $4 
       RETURNING user_id`,
      [adminName, phoneNumber, addressId, adminId]
    );

    if (!adminResult.rows.length) throw new Error("Admin not found");
    const userId = adminResult.rows[0].user_id;

    if (email || passwordHash) {
      const userQ = `UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password) WHERE user_id = $3`;
      await this.db.query(userQ, [email, passwordHash, userId]);
    }

    return this.findById(adminId);
  }

  // ✅ Helper to verify password
  async verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
  }

  // ✅ Helper to generate JWT token
  generateToken(admin) {
    return jwt.sign(
      { id: admin.adminId, email: admin.email, adminName: admin.adminName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}
