import CreateAnnouncementUseCase from "../../application/usecases/announcement/createAnnouncementUseCase.js";
import GetAnnouncementsUseCase from "../../application/usecases/announcement/getAnnouncementsUseCase.js";
import UpdateAnnouncementUseCase from "../../application/usecases/announcement/updateAnnouncementUseCase.js";
import DeleteAnnouncementUseCase from "../../application/usecases/announcement/deleteAnnouncementUseCase.js";
import AnnouncementRepository from "../../infrastructure/repositories/announcementRepository.js";
import { roleRepository } from "../../infrastructure/repositories/roleRepository.js";

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
export const getActiveAnnouncements = async (req, res) => {
  try {
    const { role } = req.admin; // e.g., "admin", "client"
    const now = new Date();

    // Convert role to role_id for filtering
    const roleMap = {
      client: 1,
      clinic_owner: 2,
      admin: 3,
    };

    const userRoleId = roleMap[role];

    const query = `
      SELECT a.*
      FROM announcements a
      WHERE a.status = 'Published'
        AND (a.start_datetime IS NULL OR a.start_datetime <= $1)
        AND (a.end_datetime IS NULL OR a.end_datetime >= $1)
        AND (
          a.target_role_id = $2  -- current user's role
          OR a.target_role_id = 4  -- all users
          OR a.target_role_id IS NULL  -- no specific target
        )
      ORDER BY a.created_at DESC;
    `;

    const result = await pool.query(query, [now, userRoleId]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching announcements:", err.message);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};
