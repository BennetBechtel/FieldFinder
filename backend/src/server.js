import app from "./app.js";
import env from "./util/validateEnv.js";
import mongoose from "mongoose";

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(
    app.listen(env.PORT, () => {
      console.log(`Server listening on localhost:${env.PORT}`);
    })
  )
  .catch((error) => {
    console.error(error);
  });
