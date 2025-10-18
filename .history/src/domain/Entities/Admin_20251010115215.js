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
    // If password looks hashed (starts with $2...), compare using bcrypt
    if (this.passwordHash && this.passwordHash.startsWith("$2")) {
      return bcrypt.compareSync(password, this.passwordHash);
    }
    // Otherwise, allow plain-text match (for early dev/testing)
    return password === this.passwordHash;
  }
}
