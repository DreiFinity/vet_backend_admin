import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../../interfaces/controllers/announcementController.js";

const router = express.Router();

// ✅ Routes
router.post("/", createAnnouncement); // Create a new announcement
router.get("/", getAnnouncements); // Get all announcements (optionally by role)
router.put("/:id", updateAnnouncement); // Update announcement
router.delete("/:id", deleteAnnouncement); // Delete announcement

export default router;
