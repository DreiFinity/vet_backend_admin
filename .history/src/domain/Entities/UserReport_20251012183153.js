// src/domain/Entities/UserReport.js
export default class UserReport {
  constructor({
    report_id,
    reported_user_id,
    reporter_user_id,
    evidence_text,
    evidence_image,
    date_reported,
    reported_user_name,
    reporter_user_name,
  }) {
    this.report_id = report_id;
    this.reported_user_id = reported_user_id;
    this.reporter_user_id = reporter_user_id;
    this.evidence_text = evidence_text;
    this.evidence_image = evidence_image;
    this.date_reported = date_reported;
    this.reported_user_name = reported_user_name;
    this.reporter_user_name = reporter_user_name;
  }
}
