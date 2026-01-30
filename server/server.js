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
/* Trust proxy for Render */
app.set("trust proxy", 1);
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
/* API Routes */
app.use("/api/auth", userRouter);
app.use("/api/app", appRouter);
/* Health Check */
app.get("/api/health", (_, res) => {
  res.status(200).json({ status: "ok" });
});

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "client/dist")));
  // React Router fallback (NO path-to-regexp)
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

/* Start server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
