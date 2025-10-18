export default class AdminController {
  constructor(signInAdminUseCase) {
    this.signInAdminUseCase = signInAdminUseCase;
  }

  signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const data = await this.signInAdminUseCase.execute(email, password);
      res.status(200).json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
}
