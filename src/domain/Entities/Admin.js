export default class Admin {
  constructor({ adminId, userId, adminName, email, role, passwordHash, phoneNumber, address }) {
    this.adminId = adminId;
    this.userId = userId;
    this.adminName = adminName;
    this.email = email;
    this.role = role;
    this.passwordHash = passwordHash;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  isAdmin() {
    return this.role === "admin";
  }

  verifyPassword(password, bcrypt) {
    if (!this.passwordHash) return false;
    if (this.passwordHash.startsWith("$2")) {
      return bcrypt.compareSync(password, this.passwordHash);
    }
    return password === this.passwordHash;
  }
}
