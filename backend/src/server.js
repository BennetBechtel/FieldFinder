import app from "./app.js";
import env from "./util/validateEnv.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
