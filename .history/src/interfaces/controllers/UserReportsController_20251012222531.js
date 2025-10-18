import GetUserReportsUseCase from "../../application/usecases/userReports/GetUserReportsUseCase.js";
import BanUserUseCase from "../../application/usecases/userReports/BanUserUseCase.js";
import UserReportsRepository from "../../infrastructure/repositories/UserReportsRepository.js";

const userReportsRepository = new UserReportsRepository();
const getUserReportsUseCase = new GetUserReportsUseCase(userReportsRepository);
const banUserUseCase = new BanUserUseCase(userReportsRepository);

const UserReportsController = {
  async getReportsByRole(req, res) {
    try {
      const { role } = req.params;
      console.log("🟢 Fetching reports for role:", role);
      const reports = await getUserReportsUseCase.execute(role);
      res.json(reports);
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
      res.status(500).json({ message: "Error fetching reports" });
    }
  },

  async banUser(req, res) {
    try {
      const { reported_user_id, evidence_text, evidence_image } = req.body;
      console.log("🚫 Banning user:", reported_user_id);
      const result = await banUserUseCase.execute({
        reported_user_id,
        evidence_text,
        evidence_image,
      });
      res.json(result);
    } catch (error) {
      console.error("❌ Error banning user:", error);
      res
        .status(500)
        .json({ message: "Error banning user", error: error.message });
    }
  },
};

export default UserReportsController;
