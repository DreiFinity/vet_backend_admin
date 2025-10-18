export default class CreateClinicUseCase {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async execute({ clinicName, email, address, phone, imagePath }) {
    return await this.clinicRepository.create({
      clinicName,
      email,
      address,
      phone,
      imagePath,
    });
  }
}
