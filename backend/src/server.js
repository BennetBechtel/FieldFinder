import "dotenv/config";
import env from "./util/validateEnv.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import myGymRoutes from "./routes/my-gyms.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// Import __dirname and path
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB Database
mongoose.connect(env.MONGO_CONNECTION_STRING);

// Express App
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-gyms", myGymRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(env.PORT, () => {
  console.log(`Server running on localhost:${env.PORT}`);
});
