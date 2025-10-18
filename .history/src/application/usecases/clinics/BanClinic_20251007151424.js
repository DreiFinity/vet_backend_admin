export default class BanClinic {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute(ownerId, reason) {
    return await this.clinicRepository.banClinicOwner(ownerId, reason);
  }
}
