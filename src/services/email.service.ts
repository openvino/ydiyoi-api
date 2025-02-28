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
      <div>
        <h2>Dear</h2>
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>You have requested a password change as a user of the OpenVino App.</p>
        <p>To modify it you must click on the following link:
        <a href="nft.openvino.org/?resetKey=${user.resetKey}">change Password</a>
        <p>Next, you must enter the information requested by the page.</p>
        <p>Kind regards</p>
        <p><strong>Any questions you can answer this email.</strong></p>
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
      timeZoneName: 'short' // GMT
    });

    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: '"Openvino" <redeem@openvino.org>',
      to: user.email,
      subject: '[YDI-YOI] New wine drinking experience',
      html: getEmailTemplate(user.email, experience.qrValue?.slice(0, experience.qrValue.length - 6), formattedDate),
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
      timeZoneName: 'short' // GMT
    });
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: '"Openvino" <redeem@openvino.org>',
      to: 'mtb@costaflores.com',
      subject: '[YDI-YOI] A new wine drinking experience has been registered',
      html: getEmailTemplate(user.email, experience.qrValue?.slice(0, experience.qrValue.length - 6), formattedDate),
    });
    return transporter.sendMail(emailTemplate);
  }



}
