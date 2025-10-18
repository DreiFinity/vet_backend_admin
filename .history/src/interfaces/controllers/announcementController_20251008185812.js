import CreateAnnouncementUseCase from "../../application/usecases/announcement/createAnnouncementUseCase.js";
import GetAnnouncementsUseCase from "../../application/usecases/announcement/getAnnouncementsUseCase.js";
import UpdateAnnouncementUseCase from "../../application/usecases/announcement/updateAnnouncementUseCase.js";
import DeleteAnnouncementUseCase from "../../application/usecases/announcement/deleteAnnouncementUseCase.js";
import AnnouncementRepository from "../../infrastructure/repositories/announcementRepository.js";
import { roleRepository } from "../../infrastructure/repositories/roleRepository.js"; // make sure to import

const repository = new AnnouncementRepository(); // ✅ this is your announcementRepo

export const createAnnouncement = async (req, res) => {
  try {
    const useCase = new CreateAnnouncementUseCase(
      repository, // <-- use repository here
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
    const useCase = new GetAnnouncementsUseCase(repository); // <-- use repository here
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
      repository, // <-- use repository here
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
    const useCase = new DeleteAnnouncementUseCase(repository); // <-- use repository here
    const deleted = await useCase.execute(id);
    res.json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
