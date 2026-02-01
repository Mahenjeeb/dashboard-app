import crypto from "node:crypto";
import Invitation from "../../models/invitation-model.js";
import userModel from "../../models/user_model.js";
import nodemailer from "nodemailer";

const createInvitation = async (req, resp) => {
  const { role, _id } = req.user;
  const { name, email, roleForUser } = req.body;
  try {
    if (role !== "SUPER_ADMIN")
      return resp
        .status(200)
        .json({ message: "please contact your administarator" });
    const invitationExisits = await Invitation.findOne({email});
    if (invitationExisits)
      return resp
        .status(200)
        .json({ message: `Invitation already exisits` });
    const user = await userModel.findById({ _id });
    const { randomBytes } = crypto;
    const token = randomBytes(4).toString("hex");
    const invitation = await Invitation.create({
      name,
      email,
      roleForUser,
      workspace: user.workspace,
      token,
    });
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jade55@ethereal.email",
        pass: "AXHqtnBfBZZJVy3p2v",
      },
    });
    await transporter.sendMail({
      from: `${user.email}`,
      to: `${invitation.email}`,
      subject: "App Invitation Mail",
      text: `Here is your invitation link ${invitation.token}`,
    });
    return resp
      .status(200)
      .json({ message: `Invitation mail sent to ${invitation.name}` });
  } catch (error) {
    return resp.status(400).json({ message: error.message });
  }
};

export default createInvitation;
