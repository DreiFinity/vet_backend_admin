import express from "express";
import pool from "../../db/postgres.js";

const router = express.Router();

// ✅ Route to get all CLIENTS (pet owners)
router.get("/pet-owners", async (req, res) => {
  try {
    // Join users + clients so we can get their client_name, phone, and email
    const result = await pool.query(`
      SELECT 
        u.user_id,
        u.email,
        u.is_banned,
        c.client_name,
        c.phone
      FROM users u
      JOIN clients c ON u.user_id = c.user_id
      WHERE u.role = 'client'
      ORDER BY u.user_id ASC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching clients:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route to ban a client
router.put("/ban/:id", async (req, res) => {
  const userId = req.params.id;
  const { reason } = req.body;

  try {
    await pool.query(
      `UPDATE users SET is_banned = true, ban_reason = $1 WHERE user_id = $2`,
      [reason, userId]
    );
    res.json({ message: "User banned successfully" });
  } catch (err) {
    console.error("❌ Error banning user:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
