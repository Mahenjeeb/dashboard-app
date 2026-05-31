import crypto from "node:crypto";
import Invitation from "../../models/invitation-model.js";
import userModel from "../../models/user_model.js";
import { sendMail } from "./mail-controller.js";
import bcrypt from "bcrypt";
import dateFormatPipeline from "../../utils/format-date.js";

const createInvitation = async (req, resp) => {
  try {
    const { role, _id } = req.user;
    const { email, roleForUser } = req.body;
    if (role !== "super admin")
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
    // build a rich HTML email with inline styles and a clear call-to-action
    const inviteUrl = `${process.env.CLIENT_URL}/accept?itoken=${invitation.token}`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Authrol Invitation</title>
  <style>
    /* basic safe inline styles for email clients */
    body { font-family: Arial, sans-serif; color: #333; line-height: 1.4; margin:0; padding:0; }
    .container { max-width: 600px; margin:0 auto; padding:20px; }
    .header { text-align: center; padding-bottom: 20px; }
    .button {
      background-color: #0094F7;
      color: #ffffff;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
    }
    .footer { font-size: 12px; color: #777; text-align: center; padding-top: 20px; }
    a { color: #0094F7; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>You're invited to join Authrol</h1>
      <p>Secure authentication made simple.</p>
    </div>
    <p>Hello,</p>
    <p>You have been invited to join <strong>Authrol</strong>. Click the button below to accept the invitation and set up your account.</p>
    <p style="text-align:center;">
      <a class="button" href="${inviteUrl}">Accept Invitation</a>
    </p>
    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
    <p><a href="${inviteUrl}">${inviteUrl}</a></p>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Authrol. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

    // also prepare a plain-text fallback to improve deliverability
    const text = `You're invited to join Authrol!\n
Visit the link below to accept the invitation:\n${inviteUrl}`;
    await sendMail(
      invitation.email,
      "You're invited to join Authrol",
      html,
      text,
    );
    return resp.status(200).json({
      message: "Invitation created and email sent successfully",
    });
  } catch (error) {
    console.log(error, "invitation error");
    return resp.status(500).json({
      message: error.message,
    });
  }
};

const checkInvitation = async (req, resp) => {
  try {
    const { itoken } = req.query;
    const { name, password } = req.body;
    const trimmedName = name?.trim();
    const invitation = await Invitation.findOne({ token: itoken });

    if (!trimmedName)
      return resp.status(400).json({ message: "Name is required" });
    if (!password)
      return resp.status(400).json({ message: "Password is required" });
    if (!invitation)
      return resp
        .status(403)
        .json({ message: "Invitation expired or not valid" });

    const existingUser = await userModel.findOne({ email: invitation.email });
    if (existingUser) {
      if (!invitation.accepted) {
        invitation.accepted = 'accepted';
        await invitation.save();
      }
      return resp.status(200).json({ message: "Invitation already accepted" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userModel.create({
      name: trimmedName,
      email: invitation.email,
      password: hashedPassword,
      role: invitation.roleForUser,
      isActive: true,
      workspace: invitation.workspace,
    });

    invitation.accepted = 'accepted';
    await invitation.save();
    if (!user)
      return resp.status(500).json({ message: "internal server error" });
    return resp.sendStatus(200);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
const getInvitedUsers = async (req, resp) => {
  try {
    const invitations = await Invitation.aggregate([{$match: {}}, ...dateFormatPipeline]);
    return resp.status(200).send(invitations);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export { createInvitation, checkInvitation, getInvitedUsers };
