export default class Admin {
  constructor({ id, email, role, passwordHash, createdAt }) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
  }

  isAdmin() {
    return this.role === "admin";
  }

  verifyPassword(password, bcrypt) {
    return bcrypt.compareSync(password, this.passwordHash);
  }
}
