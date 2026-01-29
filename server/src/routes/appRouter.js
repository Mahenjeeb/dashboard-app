import express from "express";
import createApp from "../controllers/app-controller.js";
import {
  createWorkspace,
  getWorkspace,
} from "../controllers/workspace-controller.js";
import createInvitation from "../controllers/invitation-controller.js";
import authenticateUser from "../middleware/auth-middleware.js";
const router = express.Router();
router.use(authenticateUser);
router.post("/workspace", createWorkspace);
router.get("/all-workspace", getWorkspace);
router.post("/application", createApp);
router.post("/invitation", createInvitation);
export default router;
