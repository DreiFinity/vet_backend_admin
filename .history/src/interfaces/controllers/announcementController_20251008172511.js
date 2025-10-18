import CreateAnnouncementUseCase from "../../application/usecases/announcement/createAnnouncementUseCase.js";
import GetAnnouncementsUseCase from "../../application/usecases/announcement/getAnnouncementsUseCase.js";
import UpdateAnnouncementUseCase from "../../application/usecases/announcement/updateAnnouncementUseCase.js";
import DeleteAnnouncementUseCase from "../../application/usecases/announcement/deleteAnnouncementUseCase.js";
import AnnouncementRepository from "../../infrastructure/repositories/announcementRepository.js";

const repository = new AnnouncementRepository();

export const createAnnouncement = async (req, res) => {
  try {
    const useCase = new CreateAnnouncementUseCase();
    const result = await useCase.execute(req.body);
    return res
      .status(201)
      .json({
        success: true,
        message: "Announcement created successfully",
        data: result,
      });
  } catch (error) {
    console.error("❌ Create Announcement Error:", error.message); // 🧠 ADD THIS
    return res
      .status(500)
      .json({ message: "Failed to create announcement", error: error.message });
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
