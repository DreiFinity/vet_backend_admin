import GetClinics from "../../application/usecases/clinics/GetClinics.js";
import BanClinic from "../../application/usecases/clinics/BanClinic.js";
import GetBannedClinics from "../../application/usecases/clinics/GetBannedClinics.js";
import UnbanClinic from "../../application/usecases/clinics/UnbanClinic.js";

export default class BanClinicController {
  constructor(clinicRepository) {
    this.clinicRepository = clinicRepository;
  }

  async getAll(req, res) {
    try {
      const useCase = new GetClinics(this.clinicRepository);
      const clinics = await useCase.execute();
      res.json(clinics);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async ban(req, res) {
    try {
      const ownerId = parseInt(req.params.ownerId);
      const { reason } = req.body;

      if (!reason || !reason.trim()) {
        return res.status(400).json({ error: "Ban reason is required" });
      }

      const useCase = new BanClinic(this.clinicRepository);
      const result = await useCase.execute(ownerId, reason);

      res.json({
        message: `Clinic owner ${result.email} banned`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getBanned(req, res) {
    try {
      const clinics = await this.repo.getBanned();
      res.json(clinics);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async unban(req, res) {
    try {
      const { ownerId } = req.params;
      const result = await this.repo.unban(ownerId);
      res.json({
        message: `Clinic owner ${result.email} unbanned`,
        data: result,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
