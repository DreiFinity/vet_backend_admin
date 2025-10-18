import express from "express";
import BanClinicRepositoryPostgres from "../../repositories/BanClinicRepositoryPostgres.js";
import BanClinicController from "../../../interfaces/controllers/BanClinicController.js";

const router = express.Router();
const repository = new BanClinicRepositoryPostgres();
const controller = new BanClinicController(repository);

router.get("/", (req, res) => controller.getAll(req, res));
router.put("/ban/:ownerId", (req, res) => controller.ban(req, res));

export default router;
