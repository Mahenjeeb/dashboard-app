import express from "express";
import {
  signUpUser,
  loginUser,
  logOut,
  me
} from "../controllers/auth/auth-controller.js";
import authenticateUser from "../middleware/auth-middleware.js";
import refreshAccessToken from "../controllers/auth/refreshToken-controller.js"
const router = express.Router();
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/me", authenticateUser, me);
router.get("/logout", authenticateUser, logOut);

export default router;
