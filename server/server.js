import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDatabase from "./src/config/database.js";
import userRouter from "./src/routes/userRouter.js";
import appRouter from "./src/routes/appRouter.js";

dotenv.config();
const app = express();
/* CORS MUST be first */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
/* Preflight */
app.options(
  "*",
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
/* DB */
await connectDatabase(process.env.MONGODB_URL);
/* Routes */
app.use("/api", userRouter);
app.use("/api", appRouter);

app.get("/", (_, res) => {
  res.send("Server Online");
});

/* Local only */
if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
  });
}
/* Vercel */
export default app;
