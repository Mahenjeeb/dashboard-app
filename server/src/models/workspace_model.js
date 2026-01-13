import { Schema, model } from "mongoose";

const workspaceSchema = new Schema({
  workspace_name: { type: String, required: true, unique: true },
  workspace_desc: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "users" },
});

const Workspace = model("workspaces", workspaceSchema);
export default Workspace;
