import "dotenv/config";
import express from "express";
import cors from "cors";

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/api/test", (request, response) => {
  response.json({message: "test ok"})
});

export default app;
