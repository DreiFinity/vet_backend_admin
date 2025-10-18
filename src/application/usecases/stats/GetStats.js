import Stats from "../../../domain/Entities/Stats.js";

export default class GetStats {
  constructor(statsRepository) {
    this.statsRepository = statsRepository;
  }

  async execute() {
    console.log("✅ Running GetStats use case...");
    const petOwnersCount = await this.statsRepository.countPetOwners();
    const clinicsCount = await this.statsRepository.countClinics();

    return new Stats(petOwnersCount, clinicsCount);
  }
}
