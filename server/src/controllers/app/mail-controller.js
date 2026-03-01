import { BrevoClient } from '@getbrevo/brevo';
const brevo = new BrevoClient({ apiKey: process.env.EMAIL_API_KEY });
export const sendMail = async (toEmail, subject, html, text) => {
  const payload = {
    subject,
    htmlContent: html,
    textContent: text || 'Please view this email in HTML format',
    sender: { name: 'Authrol', email: 'no-reply@mahenjeeb.online' },
    to: [{ email: toEmail }],
    replyTo: { email: 'support@mahenjeeb.online' }
  };

  const result = await brevo.transactionalEmails.sendTransacEmail(payload);
  console.log('Email sent. Message ID:', result.messageId);
};