import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Test DB connection
pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err.message));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

app.post("/api/clinic", upload.single("image"), async (req, res) => {
  try {
    const { clinicName, email, address, phone } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      "INSERT INTO clinics (clinic_name, email, address, phone, image_path) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [clinicName, email, address, phone, imagePath]
    );

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Error inserting clinic:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
