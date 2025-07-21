const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const keyRoutes = require("./routes/KeyRoutes");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

connectDB(); // DB connect

app.use("/api", authRoutes);
app.use("/api", keyRoutes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port http://0.0.0.0:${process.env.PORT} or http://localhost:${process.env.PORT}`
  );
});
