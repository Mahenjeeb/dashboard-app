import express from "express";
import {
  signup,
  login,
  logout,
  me
} from "../controllers/auth/auth-controller.js";
import authenticate from "../middleware/auth-middleware.js";
import refreshAccessToken from "../controllers/auth/refreshToken-controller.js"
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.get("/me", authenticate, me);
router.get("/logout", authenticate, logout);

export default router;
