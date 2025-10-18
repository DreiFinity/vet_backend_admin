import db from "../db/postgres.js";

export const announcementRepository = {
  async create(data) {
    const query = `INSERT INTO announcements
(title, content, category, priority, status, target_role_id, start_datetime, end_datetime)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
RETURNING *`;

    const values = [
      data.title,
      data.content,
      data.category,
      data.priority,
      data.status,
      data.target_role_id,
      data.start_datetime,
      data.end_datetime,
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async findAllForRole(roleId) {
    const { rows } = await db.query(
      `SELECT * FROM announcements WHERE target_role_id IS NULL OR target_role_id = $1 ORDER BY created_at DESC`,
      [roleId]
    );
    return rows;
  },

  async findAll() {
    const { rows } = await db.query(
      "SELECT * FROM announcements ORDER BY created_at DESC"
    );
    return rows;
  },

  async update(id, data) {
    const query = `UPDATE announcements SET
title=$1, content=$2, category=$3, priority=$4, status=$5, target_role_id=$6, start_datetime=$7, end_datetime=$8, updated_at=NOW()
WHERE announcement_id=$9 RETURNING *`;

    const values = [
      data.title,
      data.content,
      data.category,
      data.priority,
      data.status,
      data.target_role_id,
      data.start_datetime,
      data.end_datetime,
      id,
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  async delete(id) {
    await db.query("DELETE FROM announcements WHERE announcement_id=$1", [id]);
  },
};
