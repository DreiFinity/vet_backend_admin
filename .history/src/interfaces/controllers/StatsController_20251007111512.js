export default class StatsController {
  constructor(getStatsUseCase) {
    this.getStatsUseCase = getStatsUseCase;
  }

  async getStats(req, res) {
    try {
      const stats = await this.getStatsUseCase.execute();
      res.status(200).json({
        total_clients: stats.totalClients,
        total_clinics: stats.totalClinics,
      });
    } catch (error) {
      console.error("Error in StatsController:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  }
}
