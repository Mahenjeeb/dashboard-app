import express from "express";
import createApp from "../controllers/app/app-controller.js";
import {
  createWorkspace,
  getWorkspace,
} from "../controllers/app/workspace-controller.js";
import {
  createInvitation,
  checkInvitation,
  getInvitedUsers,
} from "../controllers/app/invitation-controller.js";
import { getUsers, getRoles } from "../controllers/app/user-controller.js";
import authenticate from "../middleware/auth-middleware.js";
const app_private_router = express.Router();
const app_public_router = express.Router();
app_private_router.use(authenticate);
app_private_router.post("/application", createApp);
app_private_router.post("/workspace", createWorkspace);
app_private_router.get("/all-workspace", getWorkspace);
app_private_router.post("/create-invitation", createInvitation);
app_private_router.get("/invited-users", getInvitedUsers);
app_private_router.get("/users", getUsers);
app_private_router.get("/roles", getRoles);
app_public_router.post("/accept", checkInvitation);
export { app_private_router, app_public_router };
