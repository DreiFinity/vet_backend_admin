export default class GetClinics {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute() {
    return await this.clinicRepository.getAllClinics();
  }
}
