const express = require("express");
const { connectDB } = require("./config/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is Running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
