import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./infrastructure/web/routes/userRoutes.js";
import UserController from "./interface/controllers/UserController.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// User module
app.use("/api/users", userRoutes(UserController));

// Root endpoint
app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
