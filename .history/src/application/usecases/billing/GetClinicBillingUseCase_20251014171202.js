export default class GetClinicBillingUseCase {
  constructor(clinicBillingRepository) {
    this.clinicBillingRepository = clinicBillingRepository;
  }

  async execute() {
    return await this.clinicBillingRepository.getAllClinicBilling();
  }
}
