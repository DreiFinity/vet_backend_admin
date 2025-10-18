export default class Admin {
  constructor({ id, userId, adminName, email, role, passwordHash }) {
    this.id = id; // admin_id
    this.userId = userId; // user_id
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
