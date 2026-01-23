import express from "express";
import {
  signUpUser,
  loginUser,
  logOut,
  me,
  refreshAccessToken
} from "../controllers/user-controller.js";
import verifyToken from "../middleware/user-auth-middleware.js";
const router = express.Router();
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
// router.use(verifyToken);
router.get("/me", verifyToken, me);
router.get("/logout", verifyToken, logOut);

export default router;
