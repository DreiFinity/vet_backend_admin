export default class updateAnnouncementUseCase {
  constructor(announcementRepo, roleRepo) {
    this.announcementRepo = announcementRepo;
    this.roleRepo = roleRepo;
  }

  async execute(id, data) {
    let target_role_id = null;
    if (data.targetAudience && data.targetAudience !== "All Users") {
      const role = await this.roleRepo.findByName(data.targetAudience);
      target_role_id = role ? role.role_id : null;
    }
    data.target_role_id = target_role_id;
    return await this.announcementRepo.update(id, data);
  }
}
