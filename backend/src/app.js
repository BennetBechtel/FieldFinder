import "dotenv/config";
import express from "express";
import loginRoutes from "../Routes/loginRoutes"

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.get("/api/login", loginRoutes)

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
