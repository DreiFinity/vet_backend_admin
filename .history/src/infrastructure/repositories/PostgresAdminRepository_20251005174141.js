import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";
import pool from "../db/postgresPool.js"; // make sure this file exports your Pool

export default class PostgresAdminRepository extends AdminRepository {
  async findByEmail(email) {
    const result = await this.pool.query(
      `SELECT u.user_id, u.email, u.password, u.role,
            a.admin_id, a.admin_name
     FROM users u
     JOIN admins a ON u.user_id = a.user_id
     WHERE u.email = $1
     LIMIT 1`,
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
}
