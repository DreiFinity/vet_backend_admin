export default class ClinicBilling {
  constructor(
    clinic_id,
    clinic_name,
    plan_name,
    price,
    start_date,
    end_date,
    status
  ) {
    this.clinic_id = clinic_id;
    this.clinic_name = clinic_name;
    this.plan_name = plan_name;
    this.price = price;
    this.start_date = start_date;
    this.end_date = end_date;
    this.status = status;
  }
}
