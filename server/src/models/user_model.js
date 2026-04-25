import { Schema, model } from "mongoose";
const userschema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },
    isActive: { type: Boolean, default: true },
    workspace: { type: Schema.Types.ObjectId, ref: "workspaces" },
    refreshToken: [String],
  },
  { timestamps: true },
);
const userModel = model("users", userschema);
export default userModel;
