import SignInAdmin from "../../application/use_cases/SignInAdmin.js";
import PostgresAdminRepository from "../../infrastructure/repositories/PostgresAdminRepository.js";
import db from "../../infrastructure/db/postgres.js";

const adminRepository = new PostgresAdminRepository(db);
const signInAdmin = new SignInAdmin(adminRepository);

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await signInAdmin.execute({ email, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
