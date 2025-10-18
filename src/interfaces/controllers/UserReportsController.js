import GetUserReportsUseCase from "../../application/usecases/userReports/GetUserReportsUseCase.js";
import BanUserUseCase from "../../application/usecases/userReports/BanUserUseCase.js";
import UserReportsRepository from "../../infrastructure/repositories/UserReportsRepository.js";

const userReportsRepository = new UserReportsRepository();
const getUserReportsUseCase = new GetUserReportsUseCase(userReportsRepository);
const banUserUseCase = new BanUserUseCase(userReportsRepository);

export const getReportsByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const reports = await getUserReportsUseCase.execute(role);
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports" });
  }
};
export const banUser = async (req, res) => {
  try {
    // If the request body is a JSON object, it should already be parsed.
    // But just in case, make sure it's a number:
    let { reported_user_id } = req.body;

    // If it comes as string, convert to number
    reported_user_id = Number(reported_user_id);

    if (!reported_user_id || isNaN(reported_user_id))
      return res.status(400).json({ message: "Invalid reported_user_id" });

    const user = await userReportsRepository.findUserById(reported_user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.is_banned)
      return res.status(400).json({ message: "User is already banned" });

    const bannedUser = await banUserUseCase.execute({ reported_user_id });

    return res.status(200).json({
      message: "User banned successfully",
      user: bannedUser,
    });
  } catch (error) {
    console.error("❌ Error banning user:", error);
    res.status(500).json({
      message: "Failed to ban user",
      error: error.message,
    });
  }
};
