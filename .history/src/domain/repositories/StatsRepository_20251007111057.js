export default class StatsRepository {
  async getStats() {
    throw new Error("getStats() must be implemented by subclass");
  }
}
