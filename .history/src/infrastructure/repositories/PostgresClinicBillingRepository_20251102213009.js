import IClinicBillingRepository from "../../domain/repositories/IClinicBillingRepository.js";

import pool from "../db/postgres.js";
import ClinicBilling from "../../domain/Entities/ClinicBilling.js";

export default class PostgresClinicBillingRepository extends IClinicBillingRepository {
  async getAllClinicBilling() {
    const query = `
      SELECT 
          c.clinic_id,
          c.clinic_name,
          sp.name AS plan_name,
          sp.price,
          us.start_date,
          us.end_date,
          us.status
      FROM clinics c
      JOIN users u 
          ON c.owner_id = u.user_id
      JOIN user_subscriptions us
          ON u.user_id = us.user_id
      JOIN subscription_plans sp
          ON us.plan_id = sp.plan_id
      WHERE u.role = 'clinic_owner'
        AND sp.name IN ('Monthly', 'Yearly', 'Free Trial');
    `;

    const { rows } = await pool.query(query);
    return rows.map(
      (r) =>
        new ClinicBilling(
          r.clinic_id,
          r.clinic_name,
          r.plan_name,
          r.price,
          r.start_date,
          r.end_date,
          r.status
        )
    );
  }
}
