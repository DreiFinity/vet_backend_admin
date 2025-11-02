export default class GetVeterinarianBillingUseCase {
  constructor(veterinarianBillingRepository) {
    this.veterinarianBillingRepository = veterinarianBillingRepository;
  }

  async execute() {
    return await this.veterinarianBillingRepository.getVeterinarianBilling();
  }
}
