import { announcementRepository } from "../../../infrastructure/repositories/announcementRepository.js";

export const deleteAnnouncementUseCase = async (id) => {
  return await announcementRepository.delete(id);
};
