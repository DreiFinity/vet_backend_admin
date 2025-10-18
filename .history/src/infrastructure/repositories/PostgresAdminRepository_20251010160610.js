import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByUsername(adminName) {
    const result = await this.db.query(
      `SELECT a.admin_id, a.admin_name, u.user_id, u.email, u.password, u.role
       FROM admins a
       JOIN users u ON a.user_id = u.user_id
       WHERE a.admin_name = $1 LIMIT 1`,
      [adminName]
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

  async create({ adminName, email, passwordHash, phoneNumber, address }) {
    return { adminName, email, passwordHash, phoneNumber, address }; // stub just for debugging
  }
}
