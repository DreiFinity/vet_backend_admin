import express from "express";
import PostgresUserRepository from "../../repositories/PostgresUserRepository.js";
import BanUserUseCase from "../../../application/usecases/BanUserUseCase.js";
import UserController from "../../../interfaces/controllers/UserController.js";

const router = express.Router();

const userRepository = new PostgresUserRepository();
const banUserUseCase = new BanUserUseCase(userRepository);
const userController = new UserController(banUserUseCase, userRepository);

// GET all users
router.get("/", (req, res) => userController.getAllUsers(req, res));

// BAN user
router.put("/ban/:userId", (req, res) => userController.banUser(req, res));

export default router;
