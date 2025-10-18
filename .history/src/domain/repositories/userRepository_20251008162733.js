import db from "../db/postgres.js";

export const userRepository = {
  async findById(id) {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id=$1", [
      id,
    ]);
    return rows[0];
  },
};
