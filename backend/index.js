const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/AuthRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(express.json());

connectDB(); // DB connect

app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
