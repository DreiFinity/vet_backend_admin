import IUserRepository from "../../domain/repositories/IUserRepository.js";
import pool from "../db/postgres.js"; // make sure path is correct

export default class UserRepository extends IUserRepository {
  async getAllUsers() {
    const query = `
      SELECT user_id, email, role, is_banned, ban_reason 
      FROM users 
      ORDER BY user_id ASC
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  async banUser(userId, reason) {
    const query = `
      UPDATE users
      SET is_banned = true, ban_reason = $1
      WHERE user_id = $2
      RETURNING user_id, email, is_banned, ban_reason
    `;
    const { rows } = await pool.query(query, [reason, userId]);
    return rows[0];
  }
}
