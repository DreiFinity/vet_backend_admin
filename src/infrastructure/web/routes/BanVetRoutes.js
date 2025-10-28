import express from "express";
import BanVetRepositoryPostgres from "../../repositories/BanVetRepositoryPostgres.js";
import BanVetController from "../../../interfaces/controllers/BanVetController.js";

const router = express.Router();
const repository = new BanVetRepositoryPostgres();
const controller = new BanVetController(repository);

router.get("/", (req, res) => controller.getAll(req, res));
router.put("/ban/:vetId", (req, res) => controller.ban(req, res));
router.get("/banned", (req, res) => controller.getBanned(req, res));
router.put("/unban/:vetId", (req, res) => controller.unban(req, res));

export default router;
