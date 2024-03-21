import "dotenv/config";
import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.status(200).send("Hello World!")
})

export default app;
