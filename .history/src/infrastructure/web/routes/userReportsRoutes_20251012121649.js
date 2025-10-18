import express from "express";
import {
  getUserReports,
  addUserReport,
  banUser,
} from "../../../interfaces/controllers/UserReportsController.js";

const router = express.Router();

// Fetch all reports
router.get("/", getUserReports);

// Add a report
router.post("/", addUserReport);

// Ban user
router.put("/ban/:userId", banUser);

export default router;
