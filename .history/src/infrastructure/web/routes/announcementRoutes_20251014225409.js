import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getAdminAnnouncements,
} from "../../../interfaces/controllers/announcementController.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);
router.get("/admin_announcements", getAdminAnnouncements);

export default router;
