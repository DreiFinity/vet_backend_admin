export default class Announcement {
  constructor({
    id,
    title,
    content,
    category,
    target_role_id,
    priority,
    status,
    start_datetime,
    end_datetime,
    created_at,
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.target_role_id = target_role_id; // mapped from role
    this.priority = priority;
    this.status = status;
    this.start_datetime = start_datetime;
    this.end_datetime = end_datetime;
    this.created_at = created_at;
  }
}
