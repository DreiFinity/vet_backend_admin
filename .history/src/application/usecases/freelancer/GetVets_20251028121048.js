export default class GetVets {
  constructor(vetRepository) {
    this.vetRepository = vetRepository;
  }

  async execute() {
    return await this.vetRepository.getAllVets();
  }
}
