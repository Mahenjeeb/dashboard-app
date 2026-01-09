import { Schema, model } from "mongoose";
const userschema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN", "USER"],
      default: "USER",
    },
    isActive: { type: Boolean, default: true },
    refreshToken: String,
  },
  { timestamps: true }
);
const userModel = model("users", userschema);
export default userModel;
