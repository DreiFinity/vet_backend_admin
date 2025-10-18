import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail(email) {
    const result = await this.db.query(
      `SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
       FROM admins a
       JOIN users u ON a.user_id = u.user_id
       WHERE u.email = $1 LIMIT 1`,
      [email]
    );
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Admin({
      adminId: row.admin_id,
      userId: row.user_id,
      adminName: row.admin_name,
      email: row.email,
      role: row.role,
      passwordHash: row.password,
    });
  }

  async findById(adminId) {
    const result = await this.db.query(
      `SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
       FROM admins a
       JOIN users u ON a.user_id = u.user_id
       WHERE a.admin_id = $1`,
      [adminId]
    );
    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Admin({
      adminId: row.admin_id,
      userId: row.user_id,
      adminName: row.admin_name,
      email: row.email,
      role: row.role,
      passwordHash: row.password,
    });
  }

  // ✅ Signup with address
  async create({ adminName, email, passwordHash, phoneNumber, address }) {
    const client = await this.db.connect();

    try {
      await client.query("BEGIN");

      // 1️⃣ Insert address
      const addressResult = await client.query(
        `INSERT INTO addresses (street, city, province, postal_code, country, unit_number, latitude, longitude)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING address_id`,
        [
          address.street,
          address.city,
          address.province || null,
          address.postal_code || null,
          address.country || null,
          address.unit_number || null,
          address.latitude || null,
          address.longitude || null,
        ]
      );
      const addressId = addressResult.rows[0].address_id;

      // 2️⃣ Insert user
      const userResult = await client.query(
        `INSERT INTO users (email, password, role)
         VALUES ($1, $2, 'admin')
         RETURNING user_id`,
        [email, passwordHash]
      );
      const userId = userResult.rows[0].user_id;

      // 3️⃣ Insert admin
      const adminResult = await client.query(
        `INSERT INTO admins (user_id, admin_name, phone_number, address_id)
         VALUES ($1, $2, $3, $4)
         RETURNING admin_id, admin_name`,
        [userId, adminName, phoneNumber || null, addressId]
      );

      await client.query("COMMIT");

      return {
        admin_id: adminResult.rows[0].admin_id,
        admin_name: adminResult.rows[0].admin_name,
        email,
        role: "admin",
        address_id: addressId,
        phone_number: phoneNumber,
      };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async update(adminId, { email, adminName, passwordHash }) {
    const adminResult = await this.db.query(
      `UPDATE admins SET admin_name = $1 WHERE admin_id = $2 RETURNING user_id`,
      [adminName, adminId]
    );
    if (adminResult.rows.length === 0) throw new Error("Admin not found");

    const userId = adminResult.rows[0].user_id;
    await this.db.query(
      `UPDATE users SET email = $1, password = $2 WHERE user_id = $3`,
      [email, passwordHash, userId]
    );

    return { message: "Admin updated successfully" };
  }
}
