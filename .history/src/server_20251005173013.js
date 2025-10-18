import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./infrastructure/db/postgres.js"; // PostgreSQL pool
import PostgresAdminRepository from "./infrastructure/repositories/PostgresAdminRepository.js";
import AdminController from "./interfaces/controllers/AdminController.js";
import adminRoutes from "./interfaces/routes/adminRoutes.js"; // fixed path

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // if you have uploaded images

// ✅ Repository + Controller
const adminRepo = new PostgresAdminRepository(pool);
const adminController = new AdminController(adminRepo); // pass repo if your controller needs it

// ✅ Routes
app.use("/api/admin", adminRoutes(adminController)); // inject controller into routes

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
