export default class GetBannedVets {
  constructor(vetRepository) {
    this.vetRepository = vetRepository;
  }

  async execute() {
    return await this.vetRepository.getBannedVets();
  }
}
