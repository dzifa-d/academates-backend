import express from "express";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js";
import mateRoutes from "./routes/mateRoutes.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/mates", mateRoutes)

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
  connectDB();
});
