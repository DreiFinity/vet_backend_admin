import express from "express";
import {
  getUserReports,
  addUserReport,
  banUser,
  unbanUser,
} from "../../../interfaces/controllers/UserReportsController.js";

const router = express.Router();

// GET all reports
router.get("/", getUserReports);

// POST new report
router.post("/", addUserReport);

// PUT ban a reported user
router.put("/ban/:reportId", banUser);

// PUT unban a user
router.put("/unban/:userId", unbanUser);

export default router;
