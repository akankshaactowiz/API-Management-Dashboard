const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/AuthRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(
  cors({
    origin: { FRONTEND_URL },
  })
);
app.use(express.json());

connectDB(); // DB connect

app.use("/api", authRoutes);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port http://0.0.0.0:${process.env.PORT} or http://localhost:${process.env.PORT}`
  );
});
