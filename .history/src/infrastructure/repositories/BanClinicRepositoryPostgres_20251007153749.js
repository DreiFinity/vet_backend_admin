import ClinicRepository from "../../domain/repositories/ClinicRepository.js";
import db from "../db/postgres.js";

export default class BanClinicRepositoryPostgres extends ClinicRepository {
  // Get all clinics with owners who have role = 'clinic_owner'
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
      u.ban_reason,
      u.role
    FROM clinics c
    JOIN users u ON c.owner_id = u.user_id
    WHERE u.role = 'clinic_owner'
    ORDER BY c.created_at DESC;
  `;
    const { rows } = await db.query(query);
    return rows;
  }

  async banClinicOwner(ownerId, reason) {
    const query = `
    UPDATE users
    SET is_banned = TRUE,
        ban_reason = $2
    WHERE user_id = $1 AND role = 'clinic_owner'
    RETURNING user_id, email, is_banned, role, ban_reason;
  `;
    const { rows } = await db.query(query, [ownerId, reason]);
    if (!rows.length) throw new Error("Clinic owner not found or invalid role");
    return rows[0];
  }
}
