import pool from "../db/postgres.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";

export default class PostgresUserRepository extends IUserRepository {
  // other methods...

  async banUser(userId, banReason) {
    const query = `
      UPDATE users
      SET is_banned = true,
          ban_reason = $2
      WHERE user_id = $1
      RETURNING user_id, email, is_banned, ban_reason;
    `;
    const result = await pool.query(query, [userId, banReason]);

    if (result.rowCount === 0) {
      throw new Error("User not found");
    }

    return result.rows[0];
  }
}
