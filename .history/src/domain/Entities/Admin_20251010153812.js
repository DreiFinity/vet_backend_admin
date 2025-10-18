export default class Admin {
  constructor({ adminId, userId, adminName, email, role, passwordHash }) {
    this.adminId = adminId;
    this.userId = userId;
    this.adminName = adminName;
    this.email = email;
    this.role = role;
    this.passwordHash = passwordHash;
  }

  isAdmin() {
    return this.role === "admin";
  }

  async verifyPassword(password, bcrypt) {
    if (!this.passwordHash) return false;
    return bcrypt.compare(password, this.passwordHash);
  }
}
