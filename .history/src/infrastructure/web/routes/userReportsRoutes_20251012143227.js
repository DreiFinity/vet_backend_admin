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

// POST a new report
router.post("/", addUserReport);

// PUT ban user
router.put("/ban/:userId", banUser);

// PUT unban user
router.put("/unban/:userId", unbanUser);

export default router;
