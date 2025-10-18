import express from "express";
import StatsController from "../../../interface/controllers/StatsController.js";

const router = express.Router();

router.get("/", StatsController.getStats);

export default router;
