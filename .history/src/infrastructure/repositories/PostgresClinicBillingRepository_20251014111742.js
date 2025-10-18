import IBillingRepository from "../../domain/repositories/IBillingRepository.js";
import { getBillingTableData } from "../db/models/billingModel.js";
import BillingRecord from "../../domain/Entities/BillingRecord.js";

export default class PostgresBillingRepository extends IBillingRepository {
  async getBillingTable() {
    const rows = await getBillingTableData();
    return rows.map(
      (r) =>
        new BillingRecord({
          user_id: r.user_id,
          user_name: r.user_name,
          details: r.details,
          plan_duration: r.plan_duration,
          amount: r.amount,
          next_billing: r.next_billing,
          status: r.status,
        })
    );
  }
}
