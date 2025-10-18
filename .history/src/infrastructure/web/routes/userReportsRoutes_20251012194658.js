import express from "express";
import UserReportsController from "../../../interfaces/controllers/UserReportsController.js";

const router = express.Router();

router.get("/:role", UserReportsController.getReportsByRole);
router.post("/ban", UserReportsController.banUser);

export default router;
