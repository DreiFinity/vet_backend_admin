import IAnnouncementRepository from "../../domain/repositories/IAnnouncementRepository.js";
import { pool } from "../database/db.js";

export default class AnnouncementRepository extends IAnnouncementRepository {
  async create(announcement) {
    const query = `
      INSERT INTO announcements (title, content, category, target_audience, priority, status, start_date, end_date)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;
    const values = [
      announcement.title,
      announcement.content,
      announcement.category,
      announcement.target_audience,
      announcement.priority,
      announcement.status,
      announcement.start_date,
      announcement.end_date,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll(role) {
    let query = "SELECT * FROM announcements";
    let values = [];
    if (role && role !== "all") {
      query += " WHERE target_audience = $1 OR target_audience = 'all'";
      values = [role];
    }
    const result = await pool.query(query, values);
    return result.rows;
  }

  async update(id, data) {
    const query = `
      UPDATE announcements
      SET title=$1, content=$2, category=$3, target_audience=$4, priority=$5, status=$6, start_date=$7, end_date=$8
      WHERE announcement_id=$9
      RETURNING *;
    `;
    const values = [
      data.title,
      data.content,
      data.category,
      data.target_audience,
      data.priority,
      data.status,
      data.start_date,
      data.end_date,
      id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async delete(id) {
    const result = await pool.query(
      "DELETE FROM announcements WHERE announcement_id=$1 RETURNING *;",
      [id]
    );
    return result.rows[0];
  }
}
