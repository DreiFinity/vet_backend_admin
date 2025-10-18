// src/infrastructure/web/routes/userReports.js
import express from "express";
import {
  getUserReports,
  banUser,
} from "../../../interfaces/controllers/UserReportsController.js";

const router = express.Router();

// GET /api/user-reports?role=client or role=clinic_owner
router.get("/", getUserReports);

// PUT /api/user-reports/ban
router.put("/ban", banUser);

export default router;
