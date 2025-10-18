import Stats from "../../../domain/Entities/Stats.js";

export default async function GetStats(statsRepository) {
  const petOwnersCount = await statsRepository.countPetOwners();
  const clinicsCount = await statsRepository.countClinics();

  return new Stats(petOwnersCount, clinicsCount);
}

export default class GetStats {
  constructor(statsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute() {
    console.log("✅ Running GetStats use case...");
    const stats = await this.statsRepository.getStats();
    console.log("✅ Stats fetched:", stats);
    return stats;
  }
}