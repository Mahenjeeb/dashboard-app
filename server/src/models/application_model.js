import { Schema, model } from "mongoose";

const applicationSchema = new Schema({
  appIcon: { type: String, default: "https://www.google.com" },
  appName: { type: String, default: "Test App", required: true, unique: true },
  appDesc: { type: String },
  appUrl: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  workspace: { type: Schema.Types.ObjectId, ref: "workspaces", required: true },
});

const Application = model("application", applicationSchema);
export default Application;
