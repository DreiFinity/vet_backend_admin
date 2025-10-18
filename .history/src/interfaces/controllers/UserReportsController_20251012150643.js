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
  const { reported_user_id, reporter_user_id, evidence_text, evidence_image } =
    req.body;
  try {
    const report = await UserReportsRepository.addReport({
      reported_user_id,
      reporter_user_id,
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

// PUT ban a user based on report
export const banUser = async (req, res) => {
  const { reportId } = req.params; // report_id to use for banning
  try {
    const bannedUser = await UserReportsRepository.banUser(reportId);
    res.json(bannedUser);
  } catch (err) {
    res.status(500).json({ message: "Error banning user", error: err.message });
  }
};

// PUT unban a user
export const unbanUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const unbannedUser = await UserReportsRepository.unbanUser(userId);
    res.json(unbannedUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unbanning user", error: err.message });
  }
};
