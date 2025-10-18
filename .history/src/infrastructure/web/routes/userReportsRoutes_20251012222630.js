import express from "express";
import {
  getReportsByRole,
  banUser,
} from "../../../interfaces/controllers/UserReportsController.js";

const router = express.Router();

// Fetch reports by role
router.get("/:role", getReportsByRole);

// Ban user
router.put("/ban", banUser);

export default router;
