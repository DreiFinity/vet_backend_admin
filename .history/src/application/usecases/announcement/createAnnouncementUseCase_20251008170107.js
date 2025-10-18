export default class CreateAnnouncementUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(data) {
    return await this.repository.create(data);
  }
}
