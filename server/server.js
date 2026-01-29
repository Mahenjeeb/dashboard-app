import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./src/config/database.js";
import userRouter from "./src/routes/userRouter.js";
import appRouter from "./src/routes/appRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
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
app.get("/", (_, resp) => {
  return resp.status(200).json("server online");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
/* Exporting app for Vercel */
export default app;
