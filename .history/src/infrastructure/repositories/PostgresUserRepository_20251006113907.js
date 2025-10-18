import pool from "../db/postgres/index.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";

export default class PostgresUserRepository extends IUserRepository {
  async findById(userId) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    return result.rows[0];
  }

  async banUser(userId) {
    await pool.query("UPDATE users SET is_banned = TRUE WHERE id = $1", [
      userId,
    ]);
  }

  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}
