export default class IUserRepository {
  async getAllUsers() {
    throw new Error("getAllUsers() not implemented");
  }

  async getPetOwners() {
    throw new Error("getPetOwners() not implemented");
  }

  async banUser(userId, reason) {
    throw new Error("banUser() not implemented");
  }

   async getBannedUsers() {
    throw new Error("Method not implemented");
  }

  async unbanUser(userId) {
    throw new Error("Method not implemented");
  }
}
