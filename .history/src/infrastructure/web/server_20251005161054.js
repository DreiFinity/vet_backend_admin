import express from "express";
import cors from "cors";

import clinicRoutes from "./routes/clinicRoutes.js";
import PostgresClinicRepository from "../repositories/PostgresClinicRepository.js";
import CreateClinicUseCase from "../../application/usecases/CreateClinicUseCase.js";
import GetAllClinicsUseCase from "../../application/usecases/GetAllClinicsUseCase.js";
import ClinicController from "../../interfaces/controllers/ClinicController.js";

// ✅ Admin imports
import adminRoutes from "./routes/adminRoutes.js";
import PostgresAdminRepository from "../repositories/PostgresAdminRepository.js";
import SignInAdminUseCase from "../../application/usecases/SignInAdminUseCase.js";
import AdminController from "../../interfaces/controllers/AdminController.js";

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Clinic dependencies
const clinicRepository = new PostgresClinicRepository();
const createClinicUseCase = new CreateClinicUseCase(clinicRepository);
const getAllClinicsUseCase = new GetAllClinicsUseCase(clinicRepository);
const clinicController = new ClinicController(
  createClinicUseCase,
  getAllClinicsUseCase
);

// Admin dependencies
const adminRepository = new PostgresAdminRepository();
const signInAdminUseCase = new SignInAdminUseCase(adminRepository);
const adminController = new AdminController(signInAdminUseCase);

// Routes
app.use("/api/clinic", clinicRoutes(clinicController));
app.use("/api/auth", adminRoutes(adminController));

app.get("/", (req, res) => res.send("Backend is running ✅"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
