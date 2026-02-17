import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});
export const sendMail = async (toEmail, html) => {
  const sentFrom = new Sender(process.env.MAILERSEND_EMAIL, "Dashboard App");
  const recipients = [new Recipient(toEmail, "Dashboard App")];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("App Invitation")
    .setHtml(html)
    .setText(html);
  await mailerSend.email.send(emailParams);
};
