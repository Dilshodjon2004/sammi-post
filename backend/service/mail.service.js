const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Account activation on ${activationLink}`,
      html: `
        <div>
          <h1>For account activation follow this link:</h1>
          <a href="${activationLink}">${activationLink}</a>
        </div>
        `,
    });
  }

  async sendForgotPasswordMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Forgot password. This link will help you to recover your account.`,
      html: `
        <div>
          <h1>To recover your account just click the link below:</h1>
          <a href="${activationLink}">Click to reset your password</a>

          <b>This link will be valid during only in 15 minutes.</b>
        </div>
        `,
    });
  }
}

module.exports = new MailService();
