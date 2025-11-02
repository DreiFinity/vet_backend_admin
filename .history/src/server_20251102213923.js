import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./infrastructure/db/postgres.js";
import adminModule from "./interfaces/modules/adminModule.js";
import userRoutes from "./infrastructure/web/routes/userRoutes.js";
import statsRoutes from "./infrastructure/web/routes/statsRoutes.js";
import banclinicRoutes from "./infrastructure/web/routes/BanClinicRoutes.js";
import announcementRoutes from "./infrastructure/web/routes/announcementRoutes.js";
import userReportsRoutes from "./infrastructure/web/routes/userReportsRoutes.js";
import clinicBillingRoutes from "./infrastructure/web/routes/clinicBillingRoutes.js";
import banVetRoutes from "./infrastructure/web/routes/BanVetRoutes.js";
import veterinarianBillingRoutes from "./infrastructure/web/routes/veterinarianBillingRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/clinics", banclinicRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/user-reports", userReportsRoutes);
app.use("/api", clinicBillingRoutes);
app.use("/api/vets", banVetRoutes);
app.use("/api/veterinarian", veterinarianBillingRoutes);

adminModule(app, db);

app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
