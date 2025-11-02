import pool from "../db/postgres.js";

export default class PostgresVeterinarianBillingRepository {
  async getVeterinarianBilling() {
    const query = `
      SELECT 
          v.vet_id,
          v.name,
          v.email,
          v.specialization,
          v.employment_type,
          v.department,
          v.contact_number,
          sp.name AS plan_name,
          sp.price,
          us.start_date,
          us.end_date,
          us.status
      FROM veterinarians v
      JOIN users u 
          ON v.user_id = u.user_id
      JOIN user_subscriptions us
          ON u.user_id = us.user_id
      JOIN subscription_plans sp
          ON us.plan_id = sp.plan_id
      WHERE u.role = 'veterinarian'
        AND sp.name IN ('Monthly', 'Yearly', 'Free Trial');
    `;

    try {
      console.log("🟡 Running veterinarian billing query...");
      const { rows } = await pool.query(query);
      console.log("✅ Query successful:", rows.length, "records fetched");
      return rows.map((r) => ({
        vet_id: r.vet_id,
        name: r.name,
        email: r.email,
        specialization: r.specialization,
        employment_type: r.employment_type,
        department: r.department,
        contact_number: r.contact_number,
        plan_name: r.plan_name,
        price: r.price,
        start_date: r.start_date,
        end_date: r.end_date,
        status: r.status,
      }));
    } catch (error) {
      console.error(
        "❌ Database error in getVeterinarianBilling:",
        error.message
      );
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);

      throw error; // rethrow so controller can respond 500
    }
  }
}
