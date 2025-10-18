// src/infrastructure/repositories/UserReportsRepository.js
import db from "../db/postgres.js";
import UserReport from "../../domain/Entities/UserReport.js";

export default class UserReportsRepository {
  async getReportsByRole(role) {
    let query = "";
    if (role === "client") {
      query = `
        SELECT 
          ur.report_id,
          ur.reported_user_id,
          ur.reporter_user_id,
          ur.evidence_text,
          ur.evidence_image,
          ur.date_reported,
          c.client_name AS reported_user_name,
          c2.client_name AS reporter_user_name
        FROM user_reports ur
        JOIN users u1 ON ur.reported_user_id = u1.user_id
        JOIN clients c ON u1.user_id = c.user_id
        JOIN users u2 ON ur.reporter_user_id = u2.user_id
        JOIN clients c2 ON u2.user_id = c2.user_id
        WHERE u1.role = 'client';
      `;
    } else if (role === "clinic_owner") {
      query = `
    SELECT 
      ur.report_id,
      ur.reported_user_id,
      ur.reporter_user_id,
      ur.evidence_text,
      ur.evidence_image,
      ur.date_reported,
      COALESCE(cl.clinic_name, u1.full_name, 'Unknown Clinic') AS reported_user_name,
      COALESCE(cl2.clinic_name, u2.full_name, 'Unknown Reporter') AS reporter_user_name
    FROM user_reports ur
    JOIN users u1 ON ur.reported_user_id = u1.user_id
    LEFT JOIN clinics cl ON cl.owner_id = u1.user_id
    JOIN users u2 ON ur.reporter_user_id = u2.user_id
    LEFT JOIN clinics cl2 ON cl2.owner_id = u2.user_id
    WHERE u1.role = 'clinic_owner';
  `;
    }

    const { rows } = await db.query(query);
    return rows.map((r) => new UserReport(r));
  }

  async banUser({ reported_user_id, evidence_text, evidence_image }) {
    const query = `
      UPDATE users
      SET is_banned = true,
          ban_reason = $1,
          evidence_image = $2
      WHERE user_id = $3
      RETURNING *;
    `;
    const { rows } = await db.query(query, [
      evidence_text,
      evidence_image,
      reported_user_id,
    ]);
    return rows[0];
  }
}
