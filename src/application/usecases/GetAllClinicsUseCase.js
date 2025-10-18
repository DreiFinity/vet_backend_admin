export default class GetAllClinicsUseCase {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute() {
    return await this.clinicRepository.findAll();
  }
}
