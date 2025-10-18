export default class ClinicBillingController {
  constructor(getClinicBillingUseCase) {
    this.getClinicBillingUseCase = getClinicBillingUseCase;
  }

  async getClinicBilling(req, res) {
    try {
      const result = await this.getClinicBillingUseCase.execute();
      res.json(result);
    } catch (error) {
      console.error("Error fetching clinic billing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
