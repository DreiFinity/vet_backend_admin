import express from "express";
import pool from "../../db/postgres.js";

const router = express.Router();

// ✅ GET all pet owners (clients + users info)
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
      INNER JOIN clients c ON c.user_id = u.user_id
      WHERE u.role = 'client';
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pet owners:", err.message);
    res.status(500).json({ error: "Failed to fetch pet owners" });
  }
});

// ✅ PUT ban user
router.put("/ban/:userId", async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ error: "Ban reason is required" });
  }

  try {
    await pool.query(
      `UPDATE users SET is_banned = true, ban_reason = $1 WHERE user_id = $2;`,
      [reason, userId]
    );

    res.json({ message: "User banned successfully" });
  } catch (err) {
    console.error("Error banning user:", err.message);
    res.status(500).json({ error: "Failed to ban user" });
  }
});

export default router;
