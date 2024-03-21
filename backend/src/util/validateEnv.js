import { cleanEnv, port } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
});
