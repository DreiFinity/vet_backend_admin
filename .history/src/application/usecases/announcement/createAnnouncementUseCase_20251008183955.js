export default class CreateAnnouncementUseCase {
  constructor(announcementRepo, roleRepo) {
    this.announcementRepo = announcementRepo;
    this.roleRepo = roleRepo;
  }

  async execute({
    title,
    content,
    category,
    targetAudience,
    priority,
    status,
    start_datetime,
    end_datetime,
  }) {
    // Map targetAudience to role_id
    let target_role_id = null;
    if (targetAudience && targetAudience !== "All Users") {
      const role = await this.roleRepo.findByName(targetAudience);
      target_role_id = role ? role.role_id : null;
    }

    const announcement = {
      title,
      content,
      category,
      target_role_id,
      priority,
      status,
      start_datetime,
      end_datetime,
    };

    return await this.announcementRepo.create(announcement);
  }
}
