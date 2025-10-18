import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import AdminController from "../controllers/AdminController.js";
import adminRoutes from "../../infrastructure/web/routes/adminRoutes.js";

export default function adminModule(app, db) {
  // ✅ Use concrete Postgres repository
  const adminRepository = new PostgresAdminRepository(db);
  console.log("✅ AdminRepository initialized:", !!adminRepository);

  const adminController = new AdminController(adminRepository);
  console.log(
    "✅ AdminController initialized:",
    !!adminController.adminRepository
  );

  // ✅ pass controller to routes
  app.use("/api/admin", adminRoutes(adminController));
}
