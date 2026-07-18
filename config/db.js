const sql = require("mssql");
require("dotenv").config();

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    instanceName: "SQLEXPRESS",
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

let pool;

const connectDB = async () => {
  try {
    pool = await sql.connect(config);
    console.log("Connected to SQL Server ✅");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return pool;
};

module.exports = { connectDB, getPool, sql };
