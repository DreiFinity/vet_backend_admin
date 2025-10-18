export default class GetAnnouncementsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(role) {
    return await this.repository.getAll(role);
  }
}
