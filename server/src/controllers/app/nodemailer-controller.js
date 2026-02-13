import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

export const sendMail = async (to, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: "App Invitation",
      html,
    });
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail error:", error);
    throw error; // Re-throw so caller knows it failed
  }
};