import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import AdminController from "../controllers/AdminController.js";
import adminRoutes from "../../infrastructure/web/routes/adminRoutes.js";

export default function adminModule(app, db) {
  const adminRepository = new PostgresAdminRepository(db);
  const adminController = new AdminController(adminRepository);

  // Attach routes
  app.use("/api/admin", adminRoutes(adminController));
}
