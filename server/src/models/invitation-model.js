import { Schema, model } from "mongoose";

const invitationSchema = new Schema({
  email: { type: String, required: true, unique: true },
  roleForUser: { type: String, required: true },
  workspace: { type: Schema.Types.ObjectId, ref: "workspaces" },
  accepted: { type: String, default: "pending" },
  token: String,
  expireAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    index: { expires: 0 },
  },
});

const Invitations = model("invitations", invitationSchema);
export default Invitations;
