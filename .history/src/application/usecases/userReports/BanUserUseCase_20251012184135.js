export default class BanUserUseCase {
  constructor(userReportsRepository) {
    this.userReportsRepository = userReportsRepository;
  }

  async execute({ reported_user_id, evidence_text, evidence_image }) {
    return await this.userReportsRepository.banUser({
      reported_user_id,
      evidence_text,
      evidence_image,
    });
  }
}
