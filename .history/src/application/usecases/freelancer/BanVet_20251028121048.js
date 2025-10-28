export default class BanVet {
  constructor(vetRepository) {
    this.vetRepository = vetRepository;
  }

  async execute(vetId, reason) {
    return await this.vetRepository.banVet(vetId, reason);
  }
}
