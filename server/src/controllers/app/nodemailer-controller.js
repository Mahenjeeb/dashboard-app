import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const sendMail = async (to, html) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: "App Invitation",
      html,
    });
  } catch (error) {
    console.error("Mail error:", error);
  }
};
