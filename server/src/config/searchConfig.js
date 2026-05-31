import USERS from "../models/user_model.js";
import INVITATIONS from "../models/invitation-model.js";

const MODEL_MAP = {
  users: USERS,
  invitations: INVITATIONS,
};
const SEARCH_FIELDS = {
  users: ["email", "role"],
  invitations: ["email", "role"],
};

export { MODEL_MAP, SEARCH_FIELDS };
