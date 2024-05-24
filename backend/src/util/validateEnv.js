import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  JWT_SECRET_KEY: str(),
  FRONTEND_URL: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
  PAYPAL_CLIENT_ID: str(),
  PAYPAL_CLIENT_SECRET: str(),
});
