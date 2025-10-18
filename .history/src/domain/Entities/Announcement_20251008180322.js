export default class Announcement {
  constructor({
    id,
    title,
    content,
    category,
    target_role_id, // <-- changed from target_audience
    priority,
    status,
    start_datetime, // match DB column names
    end_datetime,
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.target_role_id = target_role_id; // <-- maps to DB
    this.priority = priority;
    this.status = status;
    this.start_datetime = start_datetime;
    this.end_datetime = end_datetime;
  }
}
