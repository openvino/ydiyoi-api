import {bind, BindingScope} from '@loopback/core';
import {createTransport, SentMessageInfo} from 'nodemailer';
import {
  EmailTemplate,
  Experience,
  UserWithRelations,
  WineWithRelations,
} from '../models';
import {getEmailTemplate} from './email/emails.template';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  // working with local .ENV variables
  private static async setupTransporter() {
    return createTransport({
      host: process.env.SMTP_SERVER,
      port: +process.env.SMTP_PORT!,
      secure: false, //false: upgrade later with STARTTLS - true: using ferozo
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
      debug: true,
      logger: true,
    });
  }

  // working with deployed dockerize email server (docker-compose version)
  // private static async setupTransporter() {
  //   return createTransport({
  //     host: 'smtp',
  //     port: 25,
  //     debug: true,
  //     logger: true
  //   });
  // }

  // Reset Password Request
  async sendResetPasswordMail(
    user: UserWithRelations,
  ): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: '"Openvino" <redeem@openvino.org>',
      to: user.email,
      subject: '[YDI-YOI] Reset Password Request',
      html: `
      <div
  style="
    font-family: 'Inter', Arial, sans-serif;
    background-color: #f9f6f7;
    padding: 40px 20px;
  "
>
  <div
    style="
      max-width: 600px;
      margin: 0 auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      border-top: 6px solid #840b4a;
    "
  >
    <div style="padding: 40px">
      <h2 style="color: #840b4a; margin-bottom: 0">
        Hello ${user.firstName} ${user.lastName},
      </h2>
      <p
        style="font-size: 15px; color: #333; margin-top: 12px; line-height: 1.6"
      >
        You have requested to <strong>update your wallet address</strong> in
        your OpenVino account.
      </p>

      <p
        style="font-size: 15px; color: #333; margin-top: 8px; line-height: 1.6"
      >
        To complete the process securely, please click the button below:
      </p>

      <div style="text-align: center; margin: 30px 0">
        <a
          href="https://nft.openvino.org/?resetKey=${user.resetKey}"
          style="
            display: inline-block;
            background-color: #840b4a;
            color: #fff;
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            letter-spacing: 0.3px;
          "
        >
          Change Wallet
        </a>
      </div>

      <p style="font-size: 14px; color: #666; line-height: 1.6">
        After clicking the link, you’ll be redirected to OpenVino where you can
        confirm and update your wallet address.
      </p>

      <p style="font-size: 14px; color: #666">
        If you didn’t request this change, please ignore this email.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0" />

      <p style="font-size: 13px; color: #999">
        Kind regards,<br />
        <strong style="color: #840b4a">OpenVino Team</strong><br />
        <a
          href="https://openvino.org"
          style="color: #840b4a; text-decoration: none"
          >openvino.org</a
        >
      </p>

      <p style="font-size: 12px; color: #bbb; margin-top: 12px">
        You can reply directly to this email if you have any questions.
      </p>
    </div>
  </div>
</div>

      `,
    });
    return transporter.sendMail(emailTemplate);
  }

  // Experience confirmation email to user
  async sendXpConfirmation(
    user: UserWithRelations,
    experience: Experience,
  ): Promise<SentMessageInfo> {
    const date = new Date(experience.date);

    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'long', // Thursday
      year: 'numeric', // 2024
      month: 'long', // August
      day: 'numeric', // 22
      hour: '2-digit', // 14
      minute: '2-digit', // 18
      hour12: false, // 24-hour clock
      timeZoneName: 'short', // GMT
    });

    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: '"Openvino" <nft@openvino.org>',
      to: user.email,
      subject: 'You Drink It, You Own It - Thank You!🍷',
      html: getEmailTemplate(
        user.email,
        experience.qrValue?.slice(0, experience.qrValue.length - 6),
        formattedDate,
      ),
    });
    return transporter.sendMail(emailTemplate);
  }

  // Experience confirmation email to admin
  async sendXpConfirmationAdmin(
    user: UserWithRelations,
    experience: Experience,
    wine: WineWithRelations,
  ): Promise<SentMessageInfo> {
    const date = new Date(experience.date);

    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'long', // Thursday
      year: 'numeric', // 2024
      month: 'long', // August
      day: 'numeric', // 22
      hour: '2-digit', // 14
      minute: '2-digit', // 18
      hour12: false, // 24-hour clock
      timeZoneName: 'short', // GMT
    });
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: '"Openvino" <redeem@openvino.org>',
      to: 'mtb@costaflores.com',
      subject: '[YDI-YOI] A new wine drinking experience has been registered',
      html: getEmailTemplate(
        user.email,
        experience.qrValue?.slice(0, experience.qrValue.length - 6),
        formattedDate,
      ),
    });
    return transporter.sendMail(emailTemplate);
  }
}
