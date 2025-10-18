import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./infrastructure/db/postgres.js";
import PostgresAdminRepository from "./infrastructure/repositories/PostgresAdminRepository.js";
import AdminController from "./interfaces/controllers/AdminController.js";
import adminRoutes from "./interfaces/routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Repository + Controller
const adminRepo = new PostgresAdminRepository(pool);
const adminController = new AdminController(adminRepo);

// Routes
app.use("/api/admin", adminRoutes(adminController));

app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
