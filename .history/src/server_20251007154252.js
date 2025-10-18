import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./infrastructure/web/routes/userRoutes.js";
import statsRoutes from "./infrastructure/web/routes/statsRoutes.js";
import banclinicRoutes from "./infrastructure/web/routes/BanClinicRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/clinics", banclinicRoutes);

app.get("/", (req, res) => {
  res.send("🚀 VetConnect Backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
