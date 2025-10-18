import db from "../db/postgres.js"; // your PostgreSQL connection

class UserReportsRepository {
  // Get all reports
  async getAllReports() {
    const result = await db.query(`
      SELECT report_id,
             reported_user_id,
             reported_user_name,
             reporter_user_id,
             reporter_user_name,
             evidence_text,
             evidence_image,
             date_reported
      FROM user_reports
      ORDER BY date_reported DESC
    `);
    return result.rows;
  }

  // Add new report
  async addReport({
    reported_user_id,
    reported_user_name,
    reporter_user_id,
    reporter_user_name,
    evidence_text,
    evidence_image,
  }) {
    const result = await db.query(
      `INSERT INTO user_reports 
       (reported_user_id, reported_user_name, reporter_user_id, reporter_user_name, evidence_text, evidence_image)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        reported_user_id,
        reported_user_name,
        reporter_user_id,
        reporter_user_name,
        evidence_text,
        evidence_image,
      ]
    );
    return result.rows[0];
  }

  // Ban a user
  async banUser(user_id, reason) {
    const result = await db.query(
      `UPDATE users SET is_banned = true, ban_reason = $1 WHERE user_id = $2 RETURNING *`,
      [reason, user_id]
    );
    return result.rows[0];
  }
}

export default new UserReportsRepository();
