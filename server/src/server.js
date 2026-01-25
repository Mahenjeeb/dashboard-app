import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import appRouter from "./routes/appRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();

// CORS middleware should be before other middlewares
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
connectDatabase(process.env.MONGODB_URL);
app.use("/api", userRouter);
app.use("/api", appRouter);
app.get("/", (_, resp) => {
  resp.send("Server Online");
});
if (process.env.NODE_ENV != "production") {
  app.listen(process.env.PORT, () => {
    console.log(`Server Listneting on Port ${process.env.PORT} 🚀`);
  });
}
