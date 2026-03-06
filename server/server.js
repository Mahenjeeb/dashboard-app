import express from "express";
import "dotenv/config";
import connectDatabase from "./src/config/database.js";
import userRouter from "./src/routes/auth_router.js";
import {
  app_private_router,
  app_public_router,
} from "./src/routes/app_router.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

/* Trust proxy for Render */
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
/* Database */
await connectDatabase(process.env.MONGODB_URL);
/* API Routes */
app.use("/api/auth", userRouter);
app.use("/api/app", app_public_router);
app.use("/api/app", app_private_router);
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
