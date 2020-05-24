const sgMail = require("@sendgrid/mail");
const emailConfig = require("../config/email.config");
const mailTemplates = require("./email.templates");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Set email configurations and send email
 * @param receiver
 * @param subject
 * @param mailBody
 * @param attachments
 */
const setConfigurationsAndSendEmail = (receiver, subject, mailBody, attachments) => {
  const mailOptions = {
    from: emailConfig.email, // Sender
    to: receiver, // List of receivers
    subject, // Subject line
    html: mailBody, // Mail body
    attachments,
  };
  return sgMail.send(mailOptions);
};

module.exports.sendNewAccountCreated = async (receiver, username) => {
  const mailSubject = "Welcome to Online Shopping Center";
  return setConfigurationsAndSendEmail(
    receiver,
    mailSubject,
    mailTemplates.newAccountCreated(username),
  );
};

module.exports.sendPasswordUpdatedNotification = async (receiver) => {
  const mailSubject = "Online store Account Password Changed";
  return setConfigurationsAndSendEmail(
    receiver,
    mailSubject,
    mailTemplates.passwordUpdatedNotification(),
  );
};

module.exports.resetPassword = async (receiver, password) => {
  const mailSubject = "Online store Account Password Reset";
  return setConfigurationsAndSendEmail(
    receiver,
    mailSubject,
    mailTemplates.resetPassword(receiver, password),
  );
};
