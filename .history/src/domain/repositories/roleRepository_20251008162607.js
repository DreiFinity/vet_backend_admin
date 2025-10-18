import db from "../db/postgres.js";

export const roleRepository = {
  async findByName(roleName) {
    const { rows } = await db.query(
      "SELECT * FROM user_roles WHERE role_name = $1",
      [roleName]
    );
    return rows[0];
  },
  async findById(roleId) {
    const { rows } = await db.query(
      "SELECT * FROM user_roles WHERE role_id = $1",
      [roleId]
    );
    return rows[0];
  },
};
