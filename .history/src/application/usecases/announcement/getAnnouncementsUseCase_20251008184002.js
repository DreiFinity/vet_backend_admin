export default class GetAnnouncementsUseCase {
  constructor(announcementRepo) {
    this.announcementRepo = announcementRepo;
  }

  async execute(roleId) {
    return await this.announcementRepo.getAll(roleId);
  }
}
