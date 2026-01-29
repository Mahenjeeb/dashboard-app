import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/database.js";
import userRouter from "./src/routes/userRouter.js";
import appRouter from "./src/routes/appRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

/* Middleware */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());
/* Database */
await connectDatabase(process.env.MONGODB_URL);
/* Routes */ 
app.use("/api/auth", userRouter);
app.use("/api/app", appRouter);
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}   
/* Exporting app for Vercel */
export default app;