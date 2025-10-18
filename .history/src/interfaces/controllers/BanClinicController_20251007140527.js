import GetClinics from "../../application/usecases/clinics/GetClinics.js";
import BanClinic from "../../application/usecases/clinics/BanClinic.js";

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
      res.status(500).json({ error: err.message });
    }
  }

  async ban(req, res) {
    try {
      const { ownerId } = req.params;
      const useCase = new BanClinic(this.clinicRepository);
      const result = await useCase.execute(ownerId);
      res.json({
        message: `Clinic owner ${result.email} banned`,
        data: result,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
