import IClinicRepository from "../../domain/repositories/IClinicRepository.js";
import pool from "../db/postgres.js";

export default class PostgresClinicRepository extends IClinicRepository {
  async create({ clinicName, email, address, phone, imagePath }) {
    const result = await pool.query(
      `INSERT INTO clinics (clinic_name, email, address, phone, image_path) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [clinicName, email, address, phone, imagePath]
    );
    return result.rows[0];
  }

  async findAll() {
    const result = await pool.query("SELECT * FROM clinics");
    return result.rows;
  }
}
