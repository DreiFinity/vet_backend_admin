import CreateAnnouncementUseCase from "../../application/usecases/announcement/CreateAnnouncementUseCase.js";
import GetAnnouncementsUseCase from "../../application/usecases/announcement/GetAnnouncementsUseCase.js";
import UpdateAnnouncementUseCase from "../../application/usecases/announcement/UpdateAnnouncementUseCase.js";

import DeleteAnnouncementUseCase from "../../application/usecases/announcement/DeleteAnnouncementUseCase.js";
import AnnouncementRepository from "../../infrastructure/repositories/announcementRepository.js";

const repository = new AnnouncementRepository();

export const createAnnouncement = async (req, res) => {
  try {
    const useCase = new CreateAnnouncementUseCase(repository);
    const announcement = await useCase.execute(req.body);
    res.status(201).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const { role } = req.query;
    const useCase = new GetAnnouncementsUseCase(repository);
    const announcements = await useCase.execute(role);
    res.status(200).json(announcements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const useCase = new UpdateAnnouncementUseCase(repository);
    const announcement = await useCase.execute(id, req.body);
    res.status(200).json(announcement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update announcement" });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const useCase = new DeleteAnnouncementUseCase(repository);
    const result = await useCase.execute(id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete announcement" });
  }
};
