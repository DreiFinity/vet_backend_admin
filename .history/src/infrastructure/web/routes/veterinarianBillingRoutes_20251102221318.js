import express from "express";
import PostgresVeterinarianBillingRepository from "../../repositories/PostgresVeterinarianBillingRepository.js";
import GetVeterinarianBillingUseCase from "../../../application/usecases/billing/GetVeterinarianBillingUseCase.js";
import VeterinarianBillingController from "../../../interfaces/controllers/VeterinarianBillingController.js";

const router = express.Router();

// Wiring dependencies
const veterinarianBillingRepository =
  new PostgresVeterinarianBillingRepository();
const getVeterinarianBillingUseCase = new GetVeterinarianBillingUseCase(
  veterinarianBillingRepository
);
const veterinarianBillingController = new VeterinarianBillingController(
  getVeterinarianBillingUseCase
);

// Route
router.get("/veterinarian-billing", (req, res) =>
  veterinarianBillingController.getVeterinarianBilling(req, res)
);

export default router;
