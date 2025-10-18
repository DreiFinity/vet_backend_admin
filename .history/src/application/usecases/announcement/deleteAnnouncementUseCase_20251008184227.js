export default class DeleteAnnouncementUseCase {
  constructor(announcementRepo) {
    this.announcementRepo = announcementRepo;
  }

  async execute(id) {
    return await this.announcementRepo.delete(id);
  }
}
