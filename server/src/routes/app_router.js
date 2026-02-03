import express from "express";
import createApp from "../controllers/app/app-controller.js";
import {
  createWorkspace,
  getWorkspace,
} from "../controllers/app/workspace-controller.js";
import createInvitation from "../controllers/app/invitation-controller.js";
import { getUsers } from "../controllers/app/user-controller.js";
import authenticate from "../middleware/auth-middleware.js";
const router = express.Router();
router.use(authenticate);
router.post("/application", createApp);
router.post("/workspace", createWorkspace);
router.get("/all-workspace", getWorkspace);
router.post("/create-invitation", createInvitation);
router.get("/users", getUsers);
export default router;
