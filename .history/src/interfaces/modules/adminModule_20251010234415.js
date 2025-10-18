// src/interfaces/modules/adminModule.js
import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import adminRoutes from "../../infrastructure/web/routes/adminRoutes.js";

export default function adminModule(app, db) {
  const adminRepository = new PostgresAdminRepository(db);
  app.use("/api/admin", adminRoutes(adminRepository));
}
