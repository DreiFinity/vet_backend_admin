import pool from "../db/postgres.js";
import IUserRepository from "../../domain/repositories/IUserRepository.js";

export default class PostgresUserRepository extends IUserRepository {
  async getAllUsers() {
    const { rows } = await pool.query(
      `SELECT user_id, email, role, is_banned, ban_reason FROM users ORDER BY user_id ASC`
    );
    return rows;
  }

  async getPetOwners() {
    const { rows } = await pool.query(`
      SELECT u.user_id, u.email, u.is_banned, u.ban_reason,
             c.client_name, c.phone
      FROM users u
      JOIN clients c ON u.user_id = c.user_id
      WHERE u.role = 'client'
      ORDER BY c.client_name ASC
    `);
    return rows;
  }

  async banUser(userId, reason) {
    const { rows } = await pool.query(
      `UPDATE users SET is_banned = true, ban_reason = $1 WHERE user_id = $2 RETURNING user_id, email, is_banned, ban_reason`,
      [reason, userId]
    );
    return rows[0];
  }

  async getBannedUsers() {
    const { rows } = await pool.query(`
    SELECT 
      u.user_id,
      u.email,
      c.client_name AS clientname,
      COALESCE(c.phone, c.tel_num, 'N/A') AS contact,
      u.is_banned AS status,
      u.ban_reason AS reason
    FROM users u
    JOIN clients c ON u.user_id = c.user_id
    WHERE u.is_banned = true
    ORDER BY c.client_name ASC
  `);
    return rows;
  }

  async unbanUser(userId) {
    const { rows } = await pool.query(
      `
      UPDATE users 
      SET is_banned = false, ban_reason = NULL
      WHERE user_id = $1
      RETURNING user_id
    `,
      [userId]
    );
    return rows[0];
  }
  async getBannedClinics() {
    const query = `
      SELECT 
        c.clinic_id,
        c.clinic_name,
        c.phone_number,
        c.owner_id,
        u.email,
        u.is_banned,
        u.ban_reason
      FROM clinics c
      JOIN users u ON c.owner_id = u.user_id
      WHERE u.role = 'clinic_owner' AND u.is_banned = true
      ORDER BY c.created_at DESC
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  // Unban a clinic owner
  async unbanClinicOwner(ownerId) {
    const query = `
      UPDATE users
      SET is_banned = false,
          ban_reason = NULL
      WHERE user_id = $1 AND role = 'clinic_owner'
      RETURNING user_id, email, is_banned, ban_reason;
    `;
    const { rows } = await db.query(query, [ownerId]);
    if (!rows.length) throw new Error("Clinic owner not found");
    return rows[0];
  }
}
