import db from "../db/postgres.js";

class UserReportsRepository {
  // Get all reports with dynamic names and ban info
  async getAllReports() {
    const result = await db.query(`
      SELECT ur.report_id,
             ur.reported_user_id,
             COALESCE(c.client_name, cl.clinic_name) AS reported_user_name,
             ur.reporter_user_id,
             COALESCE(rc.client_name, rcl.clinic_name) AS reporter_user_name,
             ur.evidence_text,
             ur.evidence_image,
             u.is_banned,
             u.ban_reason,
             u.evidence_image AS user_evidence_image,
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
  async addReport({
    reported_user_id,
    reporter_user_id,
    evidence_text,
    evidence_image,
  }) {
    const result = await db.query(
      `INSERT INTO user_reports 
         (reported_user_id, reporter_user_id, evidence_text, evidence_image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [reported_user_id, reporter_user_id, evidence_text, evidence_image]
    );
    return result.rows[0];
  }

  // Ban the reported user based on report_id
  async banUser(reportId) {
    const reportRes = await db.query(
      `SELECT reported_user_id, evidence_text, evidence_image
       FROM user_reports
       WHERE report_id = $1`,
      [reportId]
    );

    if (reportRes.rows.length === 0) throw new Error("Report not found");

    const { reported_user_id, evidence_text, evidence_image } =
      reportRes.rows[0];

    const bannedUser = await db.query(
      `UPDATE users
       SET is_banned = TRUE,
           ban_reason = $1,
           evidence_image = $2
       WHERE user_id = $3
       RETURNING *`,
      [evidence_text, evidence_image, reported_user_id]
    );

    return bannedUser.rows[0];
  }

  // Unban a user
  async unbanUser(userId) {
    const unbannedUser = await db.query(
      `UPDATE users
       SET is_banned = FALSE,
           ban_reason = NULL,
           evidence_image = NULL
       WHERE user_id = $1
       RETURNING *`,
      [userId]
    );
    return unbannedUser.rows[0];
  }
}

export default new UserReportsRepository();
