import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import resetpasswordRoute from "./routes/resetpassword.route.js";
import socialRoute from "./routes/social.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/reset-password", resetpasswordRoute);
app.use("/api/auth/social", socialRoute);

export default app;
