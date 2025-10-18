import express from "express";
import UserController from "../../../interfaces/controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAllUsers); // GET /api/users
router.get("/pet-owners", UserController.getPetOwners); // GET /api/users/pet-owners
router.put("/ban/:id", UserController.banUser); // PUT /api/users/ban/:id

export default router;
