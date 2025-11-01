import VetRepository from "../../domain/repositories/VetRepository.js";
import db from "../db/postgres.js";

export default class BanVetRepositoryPostgres extends VetRepository {
  // Fetch all freelance vets (not necessarily banned)
  async getAllVets() {
    const query = `
      SELECT 
        v.vet_id,
        v.name,
        v.specialization,
        v.position,
        v.department,
        u.email,
        u.is_banned,
        u.ban_reason,
        u.role,
        v.employment_type
      FROM veterinarians v
      JOIN users u ON v.email = u.email
      WHERE u.role = 'veterinarian' 
      ORDER BY v.vet_id DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  // Ban vet by id with reason
  async banVet(vetId, reason) {
    const query = `
      UPDATE users
      SET is_banned = true,
          ban_reason = $2
      WHERE email = (SELECT email FROM veterinarians WHERE vet_id = $1)
        AND role = 'veterinarian'
      RETURNING user_id, email, is_banned, ban_reason, role;
    `;
    const { rows } = await db.query(query, [vetId, reason]);
    if (!rows.length) throw new Error("Vet not found or invalid role");
    return rows[0];
  }

  // Get banned freelance vets
  async getBannedVets() {
    const query = `
      SELECT 
        v.vet_id,
        v.name,
        v.specialization,
        v.position,
        v.department,
        u.email,
        u.is_banned,
        u.ban_reason,
        u.evidence_image,
        v.employment_type
      FROM veterinarians v
      JOIN users u ON v.email = u.email
      WHERE u.role = 'veterinarian' AND u.is_banned = true 
      ORDER BY v.vet_id DESC;
    `;
    const { rows } = await db.query(query);
    return rows;
  }

  // Unban vet by id
  async unbanVet(vetId) {
    const query = `
      UPDATE users
      SET is_banned = false,
          ban_reason = NULL
      WHERE email = (SELECT email FROM veterinarians WHERE vet_id = $1)
        AND role = 'veterinarian'
      RETURNING user_id, email, is_banned, ban_reason;
    `;
    const { rows } = await db.query(query, [vetId]);
    if (!rows.length) throw new Error("Vet not found");
    return rows[0];
  }
}
