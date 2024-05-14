import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(cookieParser());

app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

import healthCheckRouter from "./routes/healthcheck.routes.js";
app.use("/api/v1/healthcheck", healthCheckRouter);

import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

import extractTextFromImageRouter from "./routes/exractTextFromImage.routes.js";
app.use("/api/v1/image", extractTextFromImageRouter);

export { app };
