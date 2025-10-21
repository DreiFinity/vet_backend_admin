import pool from "../postgres.js";

export async function getBillingTableData() {
  const query = `
    SELECT 
        u.user_id,
        u.email AS user_name,
        sp.name AS details,
        CASE
            WHEN sp.plan_id = 1 THEN '1 Month'
            WHEN sp.plan_id = 2 THEN '1 Year'
            WHEN sp.plan_id = 3 THEN '3 Months'
            ELSE 'Unknown'
        END AS plan_duration,
        CASE
            WHEN sp.plan_id = 1 THEN 350.00
            WHEN sp.plan_id = 2 THEN 3780.00
            WHEN sp.plan_id = 3 THEN 0.00
            ELSE 0.00
        END AS amount,
        us.end_date AS next_billing,
        us.status
    FROM user_subscriptions us
    JOIN users u ON us.user_id = u.user_id
    JOIN subscription_plans sp ON us.plan_id = sp.plan_id
    ORDER BY us.subscription_id DESC;
  `;

  const { rows } = await pool.query(query);
  return rows;
}
