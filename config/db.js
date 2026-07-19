const sql = require("mssql");
require("dotenv").config();

const masterConfig = {
  server: process.env.DB_HOST,
  database: "master",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

const dbConfig = {
  server: process.env.DB_HOST,
  database: "node_crud",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

let pool;

const connectDB = async () => {
  try {
    // First connect to master
    await sql.connect(masterConfig);
    console.log("Connected to master ✅");

    // Close master connection
    await sql.close();

    // Now connect to node_crud
    pool = await sql.connect(dbConfig);
    console.log("Connected to node_crud ✅");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database not initialized. Call connectDB first!");
  }
  return pool;
};

module.exports = { connectDB, getPool, sql };
