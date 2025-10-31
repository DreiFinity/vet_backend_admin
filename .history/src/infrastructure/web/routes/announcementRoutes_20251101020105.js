import express from "express";
import {
  createAnnouncement,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getAdminAnnouncements,
  getClinicsAnnouncements,
  getPetOwnersAnnouncements,
  getVetsAnnouncements,
} from "../../../interfaces/controllers/announcementController.js";

const router = express.Router();

// ✅ Specific GET routes FIRST
router.get("/admin_announcements", getAdminAnnouncements);
router.get("/clinics_announcements", getClinicsAnnouncements);
router.get("/pet_owners_announcements", getPetOwnersAnnouncements);
router.get("/vets_announcements", getVetsAnnouncements);

// ✅ Generic routes AFTER
router.post("/", createAnnouncement);
router.get("/", getAnnouncements);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export default router;
