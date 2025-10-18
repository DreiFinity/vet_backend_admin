// src/application/usecases/userReports/BanUserUseCase.js
export default class BanUserUseCase {
  constructor(userReportsRepository) {
    this.userReportsRepository = userReportsRepository;
  }

  async execute(reported_user_id) {
    // This will call repository logic that handles fetching evidence & banning
    return await this.userReportsRepository.banUser(reported_user_id);
  }
}
