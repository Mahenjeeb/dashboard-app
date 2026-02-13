import { Resend } from 'resend';
export const sendMail = async (to, html) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: "App Invitation",
      html,
    });
    console.log('Email sent successfully:', data.id);
    return data;
  } catch (error) {
    console.error("Mail error:", error);
    throw error;
  }
};