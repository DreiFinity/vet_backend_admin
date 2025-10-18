import express from "express";
import BanClinicRepositoryPostgres from "../../repositories/BanClinicRepositoryPostgres.js";
import BanClinicController from "../../../interfaces/controllers/BanClinicController.js";

const router = express.Router();
const repository = new BanClinicRepositoryPostgres();
const controller = new BanClinicController(repository);

router.get("/", (req, res) => controller.getAll(req, res));
router.put("/ban/:ownerId", (req, res) => controller.ban(req, res));
router.get("/banned", controller.getBanned.bind(controller));
router.post("/unban/:ownerId", controller.unban.bind(controller));
export default router;
