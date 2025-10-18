import express from "express";
import pool from "../../db/postgres.js";

const router = express.Router();

// ✅ Get all clients (users with role='client')
router.get("/pet-owners", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.user_id,
        u.email,
        u.is_banned,
        u.ban_reason,
        c.client_name,
        c.phone
      FROM users u
      JOIN clients c ON u.user_id = c.user_id
      WHERE u.role = 'client'
      ORDER BY c.client_name ASC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching pet owners:", err);
    res.status(500).json({ message: "Error fetching pet owners" });
  }
});

// ✅ Ban client (no unban)
router.put("/ban/:id", async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET is_banned = true, ban_reason = $1 WHERE user_id = $2 RETURNING *`,
      [reason, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User banned successfully" });
  } catch (err) {
    console.error("❌ Error banning user:", err);
    res.status(500).json({ message: "Failed to ban user" });
  }
});

export default router;
