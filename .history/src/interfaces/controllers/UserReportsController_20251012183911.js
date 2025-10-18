// src/interfaces/controllers/UserReportsController.js
import BanUserUseCase from "../../application/usecases/userReports/BanUserUseCase.js";
import GetUserReportsUseCase from "../../application/usecases/userReports/GetUserReportsUseCase.js";
import UserReportsRepository from "../../infrastructure/repositories/UserReportsRepository.js";

const repository = new UserReportsRepository();
const getReportsUseCase = new GetUserReportsUseCase(repository);
const banUserUseCase = new BanUserUseCase(repository);

export const getUserReports = async (req, res) => {
  try {
    const role = req.query.role || "client"; // default to client
    const reports = await getReportsUseCase.execute(role);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reports" });
  }
};

export const banUser = async (req, res) => {
  try {
    const { reported_user_id, evidence_text, evidence_image } = req.body;
    const bannedUser = await banUserUseCase.execute({
      reported_user_id,
      evidence_text,
      evidence_image,
    });
    res.json(bannedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error banning user" });
  }
};
