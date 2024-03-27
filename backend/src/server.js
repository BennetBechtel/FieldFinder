import "dotenv/config";
import env from "./util/validateEnv.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
// Connect to MongoDB Database
mongoose.connect(env.MONGO_CONNECTION_STRING);

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/api/test", async (request, response) => {
  response.json({ message: "test ok" });
});
app.use("/api/users", userRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on localhost:${env.PORT}`);
});
