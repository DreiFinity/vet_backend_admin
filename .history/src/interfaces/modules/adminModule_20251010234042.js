import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import adminRoutes from "../../infrastructure/web/routes/adminRoutes.js";

export default function adminModule(app, db) {
  const adminRepository = new PostgresAdminRepository(db);
  console.log("✅ AdminRepository initialized:", !!adminRepository);

  // pass db-aware controller if needed
  app.use("/api/admin", adminRoutes);
}
