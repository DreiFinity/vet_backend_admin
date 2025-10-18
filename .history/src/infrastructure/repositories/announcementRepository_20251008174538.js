import IAnnouncementRepository from "../../domain/repositories/IAnnouncementRepository.js";
import pool from "../db/postgres.js";

export default class AnnouncementRepository extends IAnnouncementRepository {
  async create(announcement) {
    const query = `
  INSERT INTO announcements
    (title, content, category, target_role_id, priority, status, start_datetime, end_datetime)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
  RETURNING *;
`;

    const values = [
      announcement.title,
      announcement.content,
      announcement.category,
      announcement.target_role_id, // <-- use role_id
      announcement.priority,
      announcement.status,
      announcement.start_datetime,
      announcement.end_datetime,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAll(role_id) {
    let query = "SELECT * FROM announcements";
    let values = [];
    if (role_id) {
      query += " WHERE target_role_id=$1 OR target_role_id IS NULL"; // send to all
      values = [role_id];
    }
    const result = await pool.query(query, values);
    return result.rows;
  }
  async update(id, data) {
    const query = `
    UPDATE announcements
    SET title=$1, content=$2, category=$3, target_role_id=$4, priority=$5, status=$6, start_datetime=$7, end_datetime=$8
    WHERE announcement_id=$9
    RETURNING *;
  `;
    const values = [
      data.title,
      data.content,
      data.category,
      data.target_role_id, // <-- must match your FK
      data.priority,
      data.status,
      data.start_datetime,
      data.end_datetime,
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
