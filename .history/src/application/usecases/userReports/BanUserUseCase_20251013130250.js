// src/application/usecases/userReports/BanUserUseCase.js
export default class BanUserUseCase {
  constructor(userReportsRepository) {
    this.userReportsRepository = userReportsRepository;
  }

  async execute(reported_user_id) {
    return await this.userReportsRepository.banUser(reported_user_id);
  }
}
