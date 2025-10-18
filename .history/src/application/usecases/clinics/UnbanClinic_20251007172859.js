export default class UnbanClinic {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute(ownerId) {
    return await this.clinicRepository.unbanClinicOwner(ownerId);
  }
}
