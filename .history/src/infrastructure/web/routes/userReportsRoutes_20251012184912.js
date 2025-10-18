import express from "express";
import UserReportsController from "../controllers/UserReportsController.js";

const router = express.Router();

// Get reports for clients
router.get("/clients", UserReportsController.getClientReports);

// Get reports for clinic owners
router.get("/clinic-owners", UserReportsController.getClinicOwnerReports);

// Ban user
router.post("/ban/:id", UserReportsController.banUser);

export default router;
