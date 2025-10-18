import UserReportsRepository from "../../infrastructure/repositories/UserReportsRepository.js";

// GET all reports
export const getUserReports = async (req, res) => {
  try {
    const reports = await UserReportsRepository.getAllReports();
    res.json(reports);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching reports", error: err.message });
  }
};

// POST a new report
export const addUserReport = async (req, res) => {
  const {
    reported_user_id,
    reported_user_name,
    reporter_user_id,
    reporter_user_name,
    evidence_text,
    evidence_image,
  } = req.body;
  try {
    const report = await UserReportsRepository.addReport({
      reported_user_id,
      reported_user_name,
      reporter_user_id,
      reporter_user_name,
      evidence_text,
      evidence_image,
    });
    res.status(201).json(report);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating report", error: err.message });
  }
};

// PUT ban user
export const banUser = async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;
  try {
    const bannedUser = await UserReportsRepository.banUser(userId, reason);
    res.json(bannedUser);
  } catch (err) {
    res.status(500).json({ message: "Error banning user", error: err.message });
  }
};
