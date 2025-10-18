import pkg from "pg";
import dotenv from "dotenv";
dotenv.config(); // MUST be called first

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // must be string
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT), // optional: convert to number
  database: process.env.DB_NAME,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB Connection Error:", err.message));

export default pool;
