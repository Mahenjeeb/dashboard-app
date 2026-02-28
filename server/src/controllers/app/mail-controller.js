import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({ apiKey: process.env.EMAIL_API_KEY });
export const sendMail = async (toEmail, html) => {
  const result = await brevo.transactionalEmails.sendTransacEmail({
    subject: "You're invited to join Authrol",
    htmlContent: html,
    sender: { name: 'Authrol', email: 'no-reply@mahenjeeb.online' },
    to: [{ email: toEmail }],
  });
  console.log('Email sent. Message ID:', result.messageId);
};
