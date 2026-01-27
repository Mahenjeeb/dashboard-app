import { Schema, model } from "mongoose";
const userschema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "SUPER_ADMIN" },
    isActive: { type: Boolean, default: true },
    workspace: { type: String, ref: "workspaces" },
    refreshToken: String,
    forceLogoutReason: {
      type: String,
      enum: ["NEW_LOGIN", "MANUAL", null],
      default: null,
    },
  },
  { timestamps: true },
);
const userModel = model("users", userschema);
export default userModel;
