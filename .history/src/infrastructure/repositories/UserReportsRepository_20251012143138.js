import db from "../db/postgres.js";

class UserReportsRepository {
  // Fetch all reports with names and ban info
  async getAllReports() {
    const result = await db.query(`
      SELECT ur.report_id,
             ur.reported_user_id,
             COALESCE(c.client_name, cl.clinic_name) AS reported_user_name,
             ur.reporter_user_id,
             COALESCE(rc.client_name, rcl.clinic_name) AS reporter_user_name,
             u.is_banned,
             u.ban_reason,
             u.evidence_image,
             ur.date_reported
      FROM user_reports ur
      LEFT JOIN clients c ON ur.reported_user_id = c.user_id
      LEFT JOIN clinics cl ON ur.reported_user_id = cl.owner_id
      LEFT JOIN clients rc ON ur.reporter_user_id = rc.user_id
      LEFT JOIN clinics rcl ON ur.reporter_user_id = rcl.owner_id
      LEFT JOIN users u ON ur.reported_user_id = u.user_id
      ORDER BY ur.date_reported DESC
    `);
    return result.rows;
  }

  // Add a new report
  async addReport({ reported_user_id, reporter_user_id }) {
    const result = await db.query(
      `INSERT INTO user_reports (reported_user_id, reporter_user_id)
       VALUES ($1, $2) RETURNING *`,
      [reported_user_id, reporter_user_id]
    );
    return result.rows[0];
  }

  // Ban a user
  async banUser(user_id, reason, evidence_image) {
    const result = await db.query(
      `UPDATE users
       SET is_banned = TRUE, ban_reason = $1, evidence_image = $2
       WHERE user_id = $3 RETURNING *`,
      [reason, evidence_image, user_id]
    );
    return result.rows[0];
  }

  // Unban a user
  async unbanUser(user_id) {
    const result = await db.query(
      `UPDATE users
       SET is_banned = FALSE, ban_reason = NULL, evidence_image = NULL
       WHERE user_id = $1 RETURNING *`,
      [user_id]
    );
    return result.rows[0];
  }
}

export default new UserReportsRepository();
