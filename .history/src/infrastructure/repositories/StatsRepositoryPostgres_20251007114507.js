import pool from "../db/postgres.js";

export default class StatsRepositoryPostgres {
  async countPetOwners() {
    const result = await pool.query("SELECT COUNT(*) FROM clients");
    return parseInt(result.rows[0].count, 10);
  }

  async countClinics() {
    const result = await pool.query("SELECT COUNT(*) FROM clinics");
    return parseInt(result.rows[0].count, 10);
  }
}
