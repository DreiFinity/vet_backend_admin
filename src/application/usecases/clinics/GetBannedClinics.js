export default class GetBannedClinics {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }
  async execute() {
    return await this.clinicRepository.getBannedClinics();
  }
}
