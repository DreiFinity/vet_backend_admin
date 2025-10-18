import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail(email) {
    const q = `
      SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role, a.phone_number, ad.*
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      JOIN addresses ad ON a.address_id = ad.address_id
      WHERE u.email = $1
      LIMIT 1
    `;
    const result = await this.db.query(q, [email]);
    console.log("Querying findByEmail for:", email);
    console.log("Result rows:", result.rows);
    if (!result.rows.length) return null;
    const r = result.rows[0];
    return new Admin({
      adminId: r.admin_id,
      userId: r.user_id,
      adminName: r.admin_name,
      email: r.email,
      role: r.role,
      passwordHash: r.password,
      phoneNumber: r.phone_number,
      address: {
        street: r.street,
        city: r.city,
        province: r.province,
        postal_code: r.postal_code,
        country: r.country,
        unit_number: r.unit_number,
        latitude: r.latitude,
        longitude: r.longitude,
      },
    });
  }

  async findById(adminId) {
    const q = `
      SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role, a.phone_number, ad.*
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      JOIN addresses ad ON a.address_id = ad.address_id
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
      phoneNumber: r.phone_number,
      address: {
        street: r.street,
        city: r.city,
        province: r.province,
        postal_code: r.postal_code,
        country: r.country,
        unit_number: r.unit_number,
        latitude: r.latitude,
        longitude: r.longitude,
      },
    });
  }

  async findByUsername(adminName) {
    const q = `
      SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.admin_name = $1
      LIMIT 1
    `;
    const result = await this.db.query(q, [adminName]);
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

      const adminQ = `
        INSERT INTO admins (user_id, admin_name, phone_number, address_id)
        VALUES ($1,$2,$3,$4) RETURNING admin_id, admin_name
      `;
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
        phoneNumber,
        address,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("PostgresAdminRepository.create error:", err);
      throw err;
    } finally {
      client.release();
    }
  }

  async update(adminId, { adminName, email, passwordHash }) {
    // 1️⃣ Get userId
    const adminRes = await this.db.query(
      `SELECT user_id FROM admins WHERE admin_id=$1`,
      [adminId]
    );
    if (!adminRes.rows.length) throw new Error("Admin not found");
    const userId = adminRes.rows[0].user_id;

    // 2️⃣ Update admins table only if adminName exists
    if (adminName) {
      await this.db.query(`UPDATE admins SET admin_name=$1 WHERE admin_id=$2`, [
        adminName,
        adminId,
      ]);
    }

    // 3️⃣ Update users table only if email or passwordHash exist
    const updates = [];
    const values = [];
    let idx = 1;

    if (email) {
      updates.push(`email=$${idx++}`);
      values.push(email);
    }
    if (passwordHash) {
      updates.push(`password=$${idx++}`);
      values.push(passwordHash);
    }

    if (updates.length > 0) {
      values.push(userId);
      await this.db.query(
        `UPDATE users SET ${updates.join(", ")} WHERE user_id=$${idx}`,
        values
      );
    }

    return { message: "Admin updated successfully" };
  }

  async findById(adminId) {
    const result = await this.db.query(
      `
      SELECT a.*, u.email, u.password, u.role
      FROM admins a
      JOIN users u ON a.user_id = u.user_id
      WHERE a.admin_id = $1
    `,
      [adminId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      adminId: row.admin_id,
      adminName: row.admin_name,
      userId: row.user_id,
      email: row.email,
      role: row.role,
      password: row.password,
    };
  }

  async updateUserPassword(userId, hashedPassword) {
    const result = await this.db.query(
      `
      UPDATE users
      SET password = $1
      WHERE user_id = $2
      RETURNING user_id, email;
    `,
      [hashedPassword, userId]
    );

    if (result.rows.length === 0)
      throw new Error("User not found or update failed.");

    return result.rows[0];
  }
}
