import CreateAnnouncementUseCase from "../../application/usecases/announcement/createAnnouncementUseCase.js";
import GetAnnouncementsUseCase from "../../application/usecases/announcement/getAnnouncementsUseCase.js";
import UpdateAnnouncementUseCase from "../../application/usecases/announcement/updateAnnouncementUseCase.js";
import DeleteAnnouncementUseCase from "../../application/usecases/announcement/deleteAnnouncementUseCase.js";
import AnnouncementRepository from "../../infrastructure/repositories/announcementRepository.js";
import { roleRepository } from "../../infrastructure/repositories/roleRepository.js";
import pool from "../../infrastructure/db/postgres.js";

const announcementRepo = new AnnouncementRepository();

export const createAnnouncement = async (req, res) => {
  try {
    const useCase = new CreateAnnouncementUseCase(
      announcementRepo,
      roleRepository
    );
    const announcement = await useCase.execute(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const roleId = req.query.role_id || "all";
    const useCase = new GetAnnouncementsUseCase(announcementRepo);
    const announcements = await useCase.execute(roleId);
    res.json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const useCase = new UpdateAnnouncementUseCase(
      announcementRepo,
      roleRepository
    );
    const updated = await useCase.execute(id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update announcement" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const useCase = new DeleteAnnouncementUseCase(announcementRepo);
    const deleted = await useCase.execute(id);
    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
export const getAdminAnnouncements = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM announcements
      WHERE 
        (target_role_id = 3 OR target_role_id IS NULL)
        AND status ILIKE 'Published'
        AND (
          start_datetime IS NULL OR start_datetime <= NOW()
        )
        AND (
          end_datetime IS NULL OR end_datetime >= NOW()
        )
      ORDER BY created_at DESC;
    `;

    const { rows } = await pool.query(query);
    console.log("✅ Announcements fetched:", rows.length);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching admin announcements:", err);
    res.status(500).json({ message: "Failed to fetch admin announcements" });
  }
};
