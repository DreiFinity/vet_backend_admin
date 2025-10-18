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

  async create({ adminName, email, passwordHash, role }) {
    const userResult = await this.db.query(
      `INSERT INTO users (email, password, role)
       VALUES ($1, $2, $3) RETURNING user_id`,
      [email, passwordHash, role]
    );

    const userId = userResult.rows[0].user_id;

    const adminResult = await this.db.query(
      `INSERT INTO admins (user_id, admin_name)
       VALUES ($1, $2)
       RETURNING admin_id, admin_name`,
      [userId, adminName]
    );

    return {
      admin_id: adminResult.rows[0].admin_id,
      admin_name: adminResult.rows[0].admin_name,
      email,
      role,
    };
  }

  async update(adminId, { email, adminName, passwordHash }) {
    const adminResult = await this.db.query(
      `UPDATE admins SET admin_name = $1 WHERE admin_id = $2 RETURNING admin_id, user_id`,
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
