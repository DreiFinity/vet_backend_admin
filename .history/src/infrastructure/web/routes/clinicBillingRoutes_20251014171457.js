import express from "express";
import PostgresClinicBillingRepository from "../../repositories/PostgresClinicBillingRepository.js";
import GetClinicBillingUseCase from "../../../application/usecases/billing/GetClinicBillingUseCase.js";
import ClinicBillingController from "../../../interfaces/controllers/ClinicBillingController.js";

const router = express.Router();

// Wiring dependencies
const clinicBillingRepository = new PostgresClinicBillingRepository();
const getClinicBillingUseCase = new GetClinicBillingUseCase(
  clinicBillingRepository
);
const clinicBillingController = new ClinicBillingController(
  getClinicBillingUseCase
);

// Route
router.get("/billing", (req, res) =>
  clinicBillingController.getClinicBilling(req, res)
);

export default router;
