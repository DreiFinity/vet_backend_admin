import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../../interfaces/controllers/announcementController.js";
import { getAnnouncements } from "../../../interfaces/controllers/announcementController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);
router.get("/active", verifyToken, getAnnouncements);

export default router;
