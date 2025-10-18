// userRoutes.js
import express from "express";
import UserController from "../../../interfaces/controllers/UserController.js";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/pet-owners", UserController.getPetOwners);
router.put("/ban/:id", UserController.banUser);
router.get("/banned", UserController.getBannedUsers);
router.put("/unban/:id", UserController.unbanUser);

export default router; // <-- just export the router, do NOT wrap in a function
