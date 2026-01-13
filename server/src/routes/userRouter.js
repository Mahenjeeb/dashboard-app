import express from "express";
import {
  signUpUser,
  loginUser,
  logOut,
  refreshAccessToken,
} from "../controllers/user-controller.js";
import verifyToken from "../middleware/user-auth-middleware.js";
const router = express.Router();
router.post("/signup", signUpUser);
router.get("/refresh", refreshAccessToken);
router.post("/login", loginUser);
router.get("/logout", verifyToken, logOut);


export default router;
