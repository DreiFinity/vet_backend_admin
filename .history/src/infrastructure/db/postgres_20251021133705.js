// import pkg from "pg";
// import dotenv from "dotenv";
// dotenv.config(); // Load environment variables first

// const { Pool } = pkg;

// // ✅ Dual setup: connects to Render when DATABASE_URL exists, else local
// const pool = new Pool(
//   process.env.DATABASE_URL
//     ? {
//         connectionString: process.env.DATABASE_URL,
//         ssl: { rejectUnauthorized: false }, // required by Render PostgreSQL
//       }
//     : {
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT),
//         database: process.env.DB_NAME,
//       }
// );

// // ✅ Test connection
// pool
//   .connect()
//   .then(() =>
//     console.log(
//       process.env.DATABASE_URL
//         ? "✅ Connected to Render PostgreSQL"
//         : "✅ Connected to Local PostgreSQL"
//     )
//   )
//   .catch((err) => console.error("❌ DB Connection Error:", err.message));

// export default pool;

// import pkg from "pg";
// import dotenv from "dotenv";
// dotenv.config(); // load .env first

// const { Pool } = pkg;

// const pool = new Pool(
//   process.env.DATABASE_URL
//     ? {
//         connectionString: process.env.DATABASE_URL,
//         ssl: { rejectUnauthorized: false },
//       }
//     : {
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD,
//         host: process.env.DB_HOST,
//         port: parseInt(process.env.DB_PORT),
//         database: process.env.DB_NAME,
//       }
// );

// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL, // ✅ use single Render connection string
// //   ssl: {
// //     rejectUnauthorized: false, // ✅ required for external connections (Render)
// //   },
// // });

// // // Test connection
// // pool
// //   .connect()
// //   .then(() => console.log("✅ Connected to Render PostgreSQL"))
// //   .catch((err) => console.error("❌ DB Connection Error:", err.message));

// // export default pool;

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
