import { createAnnouncementUseCase } from "../../application/usecases/announcement/createAnnouncementUseCase.js";
import { getAnnouncementsForUserUseCase } from "../../application/usecases/announcement/getAnnouncementsUseCase.js";
import { updateAnnouncementUseCase } from "../../application/usecases/announcement/updateAnnouncementUseCase.js";
import { deleteAnnouncementUseCase } from "../../application/usecases/announcement/deleteAnnouncementUseCase.js";

export const announcementController = {
  async create(req, res) {
    try {
      const result = await createAnnouncementUseCase(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getForUser(req, res) {
    try {
      const { userId } = req.params;
      const result = await getAnnouncementsForUserUseCase(userId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async update(req, res) {
    try {
      const result = await updateAnnouncementUseCase(req.params.id, req.body);
      res.json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await deleteAnnouncementUseCase(req.params.id);
      res.json({ message: "Deleted" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};
