import app from "./app.js";
import env from "./util/validateEnv.js";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(
    app.listen(port, () => {
      console.log(`Server listening on localhost:${port}`);
    })
  )
  .catch((error) => {
    console.error(error);
  });
