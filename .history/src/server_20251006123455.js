import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import PostgresAdminRepository from "./infrastructure/repositories/PostgresAdminRepository.js";
import AdminController from "./interface/controllers/AdminController.js";
import adminRoutes from "./infrastructure/web/routes/adminRoutes.js";

import UserController from "./interface/controllers/UserController.js";
import userRoutes from "./infrastructure/webserver/routes/userRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// Admin module wiring
// =====================
import pool from "./infrastructure/db/postgres.js"; // make sure path matches your db.js
const adminRepo = new PostgresAdminRepository(pool);
const adminController = new AdminController(adminRepo);
app.use("/api/admin", adminRoutes(adminController));

// =====================
// User module wiring
// =====================
app.use("/api/users", userRoutes(UserController));

// =====================
// Root endpoint
// =====================
app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

// =====================
// Start server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
