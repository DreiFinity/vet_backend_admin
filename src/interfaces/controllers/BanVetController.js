import GetVets from "../../application/usecases/freelancer/GetVets.js";
import BanVet from "../../application/usecases/freelancer/BanVet.js";
import GetBannedVets from "../../application/usecases/freelancer/GetBannedVets.js";
import UnbanVet from "../../application/usecases/freelancer/UnbanVet.js";

export default class BanVetController {
  constructor(vetRepository) {
    this.vetRepository = vetRepository;
  }

  async getAll(req, res) {
    try {
      const useCase = new GetVets(this.vetRepository);
      const vets = await useCase.execute();
      res.json(vets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async ban(req, res) {
    try {
      const vetId = parseInt(req.params.vetId);
      const { reason } = req.body;

      if (!reason || !reason.trim()) {
        return res.status(400).json({ error: "Ban reason is required" });
      }

      const useCase = new BanVet(this.vetRepository);
      const result = await useCase.execute(vetId, reason);

      res.json({
        message: `Freelance vet ${result.email} banned`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async getBanned(req, res) {
    try {
      const useCase = new GetBannedVets(this.vetRepository);
      const result = await useCase.execute();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }

  async unban(req, res) {
    try {
      const vetId = parseInt(req.params.vetId);
      const useCase = new UnbanVet(this.vetRepository);
      const result = await useCase.execute(vetId);

      res.json({
        message: `Freelance vet ${result.email} unbanned`,
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
}
