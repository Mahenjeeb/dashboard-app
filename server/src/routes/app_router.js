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
import {
  getUsers,
  getRoles,
  editUser,
  deleteUser,
} from "../controllers/app/user-controller.js";
import authenticate from "../middleware/auth-middleware.js";
import {
  getSearchSuggestions,
  searchData,
} from "../controllers/app/serach-controller.js";
import getPagination from "../controllers/app/pagination-controller.js";
import { applyFilters, getFilters } from "../controllers/app/filter-controller.js";

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
app_private_router.post("/update", editUser);
app_private_router.post("/delete", deleteUser);
app_private_router.get("/get_search_suggestion", getSearchSuggestions);
app_private_router.get("/search", searchData);
app_private_router.get("/filter", getFilters);
app_private_router.post("/apply-filter", applyFilters);
app_private_router.get("/pagination", getPagination);
app_public_router.post("/accept", checkInvitation);
export { app_private_router, app_public_router };
