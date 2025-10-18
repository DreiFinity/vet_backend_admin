import Stats from "../../../domain/Entities/Stats.js";

export default class GetStats {
  constructor(statsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute() {
    const { totalClients, totalClinics } =
      await this.statsRepository.getStats();
    return new Stats(totalClients, totalClinics);
  }
}
