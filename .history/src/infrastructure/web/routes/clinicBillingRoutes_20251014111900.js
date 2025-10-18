import express from "express";
import PostgresBillingRepository from "../../repositories/PostgresBillingRepository.js";
import GetBillingTableUseCase from "../../../application/usecases/billing/GetBillingTableUseCase.js";
import BillingController from "../../../interfaces/controllers/BillingController.js";

const router = express.Router();

const billingRepository = new PostgresBillingRepository();
const getBillingTableUseCase = new GetBillingTableUseCase(billingRepository);
const billingController = new BillingController(getBillingTableUseCase);

router.get("/", (req, res) => billingController.getAll(req, res));

export default router;
