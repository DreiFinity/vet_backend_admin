import GetStats from "../../application/usecases/stats/GetStats.js";
import StatsRepositoryPostgres from "../../infrastructure/repositories/StatsRepositoryPostgres.js";

const statsRepository = new StatsRepositoryPostgres();

const StatsController = {
  getStats: async (req, res) => {
    try {
      const stats = await GetStats(statsRepository);
      res.status(200).json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  },
};

export default StatsController;
