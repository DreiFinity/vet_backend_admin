import pool from "../db/postgres.js";
import StatsRepository from "../../domain/repositories/StatsRepository.js";

export default class StatsRepositoryPostgres extends StatsRepository {
  async getStats() {
    const totalClientsQuery = await pool.query(
      "SELECT COUNT(*) AS total_clients FROM clients"
    );
    const totalClinicsQuery = await pool.query(
      "SELECT COUNT(*) AS total_clinics FROM clinics"
    );

    return {
      totalClients: parseInt(totalClientsQuery.rows[0].total_clients, 10),
      totalClinics: parseInt(totalClinicsQuery.rows[0].total_clinics, 10),
    };
  }
}
