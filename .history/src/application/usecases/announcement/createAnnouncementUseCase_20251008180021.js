export default class createAnnouncementUseCase {
  constructor(announcementRepository) {
    this.announcementRepository = announcementRepository;
  }

  async execute(data) {
    try {
      const announcement = {
        title: data.title,
        content: data.content,
        category: data.category,
        priority: data.priority,
        status: data.status,
        start_datetime: data.start_datetime,
        end_datetime: data.end_datetime,
        target_role_id: data.target_role_id, // <-- must match table column
      };

      return await this.announcementRepository.create(announcement);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create announcement");
    }
  }
}
