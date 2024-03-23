import "dotenv/config";
import express from "express";

// Express App
const app = express();

// Middleware to parse json
app.use(express.json());

// Routes
app.get("/api/test", (request, response) => {
  response.json("test ok");
});

app.post("/api/sign-up", (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  response.json({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
});

export default app;
