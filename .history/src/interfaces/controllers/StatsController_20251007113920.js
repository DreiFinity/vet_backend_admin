import GetStats from "../../application/usecases/stats/GetStats.js";
import StatsRepositoryPostgres from "../../infrastructure/repositories/StatsRepositoryPostgres.js";

const statsRepository = new StatsRepositoryPostgres();

export default class StatsController {
  static async getStats(req, res) {
    try {
      const getStats = new GetStats(statsRepository);
      const stats = await getStats.execute();
      res.json(stats);
    } catch (error) {
      console.error("Error in StatsController.getStats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  }
}
