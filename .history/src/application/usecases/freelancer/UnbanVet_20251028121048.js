export default class UnbanVet {
  constructor(vetRepository) {
    this.vetRepository = vetRepository;
  }

  async execute(vetId) {
    return await this.vetRepository.unbanVet(vetId);
  }
}
