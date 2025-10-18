import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../../interfaces/controllers/announcementController.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
