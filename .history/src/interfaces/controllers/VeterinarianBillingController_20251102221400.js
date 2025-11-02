export default class VeterinarianBillingController {
  constructor(getVeterinarianBillingUseCase) {
    this.getVeterinarianBillingUseCase = getVeterinarianBillingUseCase;
  }

  async getVeterinarianBilling(req, res) {
    console.log("🔹 Veterinarian Billing endpoint hit");
    try {
      const result = await this.getVeterinarianBillingUseCase.execute();
      console.log("✅ Billing fetched:", result.length, "records");
      res.json(result);
    } catch (error) {
      console.error("❌ Error fetching veterinarian billing:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
