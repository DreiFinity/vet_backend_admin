import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail(email) {
    const result = await this.db.query(
      `SELECT u.user_id, u.email, u.password, u.role, a.admin_id, a.admin_name
     FROM users u
     JOIN admins a ON u.user_id = a.user_id
     WHERE u.email = $1
     LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];

    return new Admin({
      id: row.admin_id,
      userId: row.user_id,
      email: row.email,
      role: row.role,
      passwordHash: row.password,
      adminName: row.admin_name,
    });
  }
}
