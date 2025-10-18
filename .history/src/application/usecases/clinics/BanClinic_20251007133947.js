export default class BanClinic {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute(ownerId) {
    return await this.clinicRepository.banClinicOwner(ownerId);
  }
}
