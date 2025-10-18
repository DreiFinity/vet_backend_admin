import express from "express";
import {
  signupAdmin,
  signinAdmin,
  getAdminProfile,
  updateAdmin,
} from "../controllers/AdminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/signin", signinAdmin);
router.get("/me", verifyToken, getAdminProfile);
router.put("/update", verifyToken, updateAdmin); // ✅ Protected update route

export default router;
