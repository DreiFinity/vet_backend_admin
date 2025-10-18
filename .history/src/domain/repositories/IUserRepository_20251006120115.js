export default class IUserRepository {
  async getAllUsers() {
    throw new Error("getAllUsers() not implemented");
  }

  async banUser(userId, reason) {
    throw new Error("banUser() not implemented");
  }
}
