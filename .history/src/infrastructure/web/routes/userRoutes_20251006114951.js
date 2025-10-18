import express from "express";
import PostgresUserRepository from "../../repositories/PostgresUserRepository.js";
import UserController from "../../../interfaces/controllers/UserController.js";

const router = express.Router();
const userRepository = new PostgresUserRepository();
const userController = new UserController(userRepository);

// Existing routes...

router.post("/ban", (req, res) => userController.banUser(req, res));

export default router;
