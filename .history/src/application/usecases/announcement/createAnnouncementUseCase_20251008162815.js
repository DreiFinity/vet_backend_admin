import { announcementRepository } from "../../../infrastructure/repositories/announcementRepository.js";
import { roleRepository } from "../../../infrastructure/repositories/roleRepository.js";

export const createAnnouncementUseCase = async (payload) => {
  const { targetAudience } = payload;
  let target_role_id = null;

  if (targetAudience && targetAudience.toLowerCase() !== "all users") {
    const role = await roleRepository.findByName(targetAudience);
    if (!role) throw new Error("Invalid target audience");
    target_role_id = role.role_id;
  }

  const data = { ...payload, target_role_id };
  return await announcementRepository.create(data);
};
