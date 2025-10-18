import express from "express";
import cors from "cors";
import clinicRoutes from "./routes/clinicRoutes.js";
import PostgresClinicRepository from "../repositories/PostgresClinicRepository.js";
import CreateClinicUseCase from "../../application/usecases/CreateClinicUseCase.js";
import GetAllClinicsUseCase from "../../application/usecases/GetAllClinicsUseCase.js";
import ClinicController from "../../interfaces/controllers/ClinicController.js";

// Setup Express
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Dependency Injection
const clinicRepository = new PostgresClinicRepository();
const createClinicUseCase = new CreateClinicUseCase(clinicRepository);
const getAllClinicsUseCase = new GetAllClinicsUseCase(clinicRepository);
const clinicController = new ClinicController(
  createClinicUseCase,
  getAllClinicsUseCase
);

// Routes
app.use("/api/clinic", clinicRoutes(clinicController));

app.get("/", (req, res) => res.send("Backend is running ✅"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
