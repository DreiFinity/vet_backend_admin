import AdminRepository from "../../domain/repositories/AdminRepository.js";
import Admin from "../../domain/Entities/Admin.js";

export default class PostgresAdminRepository extends AdminRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async findByEmail(email) {
    const result = await this.db.query(
      "SELECT * FROM admins WHERE email = $1 LIMIT 1",
      [email]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new Admin({
      adminId: row.admin_id,
      email: row.email,
      role: row.role,
      passwordHash: row.password,
      createdAt: row.created_at,
    });
  }
}
