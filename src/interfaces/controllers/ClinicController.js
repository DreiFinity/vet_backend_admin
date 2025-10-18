export default class ClinicController {
  constructor(createClinicUseCase, getAllClinicsUseCase) {
    this.createClinicUseCase = createClinicUseCase;
    this.getAllClinicsUseCase = getAllClinicsUseCase;
  }

  createClinic = async (req, res) => {
    try {
      const { clinicName, email, address, phone } = req.body;
      const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

      const clinic = await this.createClinicUseCase.execute({
        clinicName,
        email,
        address,
        phone,
        imagePath,
      });

      res.json({ success: true, data: clinic });
    } catch (err) {
      console.error("❌ Error creating clinic:", err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  };

  getClinics = async (req, res) => {
    try {
      const clinics = await this.getAllClinicsUseCase.execute();
      res.json({ success: true, data: clinics });
    } catch (err) {
      console.error("❌ Error fetching clinics:", err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  };
}
