export default class GetUserReportsUseCase {
  constructor(userReportsRepository) {
    this.userReportsRepository = userReportsRepository;
  }

  async execute(role) {
    return await this.userReportsRepository.getReportsByRole(role);
  }
}
