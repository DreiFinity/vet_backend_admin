import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import adminRoutes from "../../infrastructure/web/routes/adminRoutes.js";

export default function adminModule(app, db) {
  // Initialize repository
  const adminRepository = new PostgresAdminRepository(db);
  console.log("✅ AdminRepository initialized:", !!adminRepository);

  // You no longer need to instantiate AdminController because you use named exports
  // All route handlers in adminRoutes already use the named exports

  app.use("/api/admin", adminRoutes);

  console.log("✅ Admin routes registered");
}
