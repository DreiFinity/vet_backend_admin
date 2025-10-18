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

  verifyPassword(password, bcrypt) {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
