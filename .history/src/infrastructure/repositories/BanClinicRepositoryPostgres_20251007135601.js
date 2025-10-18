import ClinicRepository from "../../domain/repositories/ClinicRepository.js";
import db from "../db/postgres.js";

export default class BanClinicRepositoryPostgres extends ClinicRepository {
  // ✅ Get all clinics where the owner has role = 'clinic_owner'
  async getAllClinics() {
    const query = `
      SELECT 
        c.clinic_id,
        c.clinic_name,
        c.phone_number,
        c.is_active,
        c.owner_id,
        c.created_at,
        u.email,
        u.is_banned,
        u.role
      FROM clinics c
      JOIN users u ON c.owner_id = u.user_id
      WHERE u.role = 'clinic_owner'
      ORDER BY c.created_at DESC;
    `;

    const { rows } = await db.query(query);
    return rows;
  }

  // ✅ Ban only clinic owners
  async banClinicOwner(ownerId) {
    const query = `
      UPDATE users
      SET is_banned = true
      WHERE user_id = $1 AND role = 'clinic_owner'
      RETURNING user_id, email, is_banned, role;
    `;
    const { rows } = await db.query(query, [ownerId]);
    if (!rows.length) throw new Error("Clinic owner not found or invalid role");
    return rows[0];
  }
}
