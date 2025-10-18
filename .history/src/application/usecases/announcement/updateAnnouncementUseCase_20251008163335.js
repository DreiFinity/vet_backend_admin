import { announcementRepository } from "../../../infrastructure/repositories/announcementRepository.js";
import { roleRepository } from "../../../infrastructure/repositories/roleRepository.js";

export const updateAnnouncementUseCase = async (id, payload) => {
  let target_role_id = null;
  if (
    payload.targetAudience &&
    payload.targetAudience.toLowerCase() !== "all users"
  ) {
    const role = await roleRepository.findByName(payload.targetAudience);
    if (!role) throw new Error("Invalid target audience");
    target_role_id = role.role_id;
  }
  const data = { ...payload, target_role_id };
  return await announcementRepository.update(id, data);
};
