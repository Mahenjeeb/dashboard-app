import crypto from "node:crypto";
import Invitation from "../../models/invitation-model.js";
import userModel from "../../models/user_model.js";
import { sendMail } from "./nodemailer-controller.js";
import bcrypt from "bcrypt";

const createInvitation = async (req, resp) => {
  const { role, _id } = req.user;
  const { email, roleForUser } = req.body;
  try {
    if (role !== "SUPER_ADMIN")
      return resp
        .status(200)
        .json({ message: "please contact your administarator" });
    const invitationExisits = await Invitation.findOne({ email });
    if (invitationExisits)
      return resp.status(200).json({ message: `Invitation already exisits` });
    const user = await userModel.findById({ _id });
    const { randomBytes } = crypto;
    const token = randomBytes(4).toString("hex");
    const invitation = await Invitation.create({
      email,
      roleForUser,
      workspace: user.workspace,
      token,
    });
    const to = invitation.email;
    const html = `
      <h2>You are invited</h2>
      <p>Click below to accept invitation:</p>
      <a href="${process.env.CLIENT_URL}/accept?itoken=${invitation.token}">
        Accept Invitation
      </a>
    `;
    await sendMail(to, html);
    return resp.status(200).json({ message: "Invitation Created" });
  } catch (error) {
    return resp.status(400).json({ message: error.message });
  }
};

const checkInvitation = async (req, resp) => {
  try {
    const { itoken } = req.query;
    const { password } = req.body;
    const invitation = await Invitation.findOne({ token: itoken });
    if (!invitation)
      return resp
        .status(403)
        .json({ message: "Invitation expired or not valid" });
    if (invitation.accepted)
      return resp.status(200).json({ message: "Invitation already accepted" });

    invitation.accepted = true;
    await invitation.save();
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      email: invitation.email,
      password: hashedPassword,
      role: invitation.roleForUser,
      isActive: true,
      workspace: invitation.workspace,
    });
    if (!user)
      return resp.status(500).json({ message: "internal server error" });
    return resp.sendStatus(200);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export { createInvitation, checkInvitation };
