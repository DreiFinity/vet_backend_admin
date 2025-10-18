export default class ClinicRepository {
  async getAllClinics() {
    throw new Error("getAllClinics not implemented");
  }

  async banClinicOwner(ownerId, reason) {
    throw new Error("banClinicOwner not implemented");
  }

  async getBannedClinics() {
    throw new Error("getBannedClinics not implemented");
  }

  async unbanClinicOwner(ownerId) {
    throw new Error("unbanClinicOwner not implemented");
  }
}
