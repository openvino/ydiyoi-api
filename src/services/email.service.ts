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
      html: getEmailTemplate(user.email, experience.qrValue?.slice(0, experience.qrValue.length - 6)),
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
      html: `
      <div
    style="font-family: 'Lucida Sans', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; color: #FFFFFF; padding: 15px; background-color: #850d4a; border: 1px solid #DDDDDD; border-radius: 10px; max-width: 100%; margin: auto; text-align: center;">
    <img style="width: 80%; max-width: 300px; margin: 0 auto 20px; display: block;" src="https://openvino.exchange/assets/images/openvino-logo.png" alt="OpenVino Logo">

    <h2 style="color: #FFFFFF; margin-bottom: 20px; font-size: 1.5rem;">New Drinking Experience</h2>

    <p style="color: #FFFFFF; font-size: 1rem; line-height: 1.7; margin-bottom: 20px;">A user has shared a new wine drinking experience.</p>

    <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 10px;">User Email:
        <span style="color: #DDDDDD; font-weight: normal;">${user.email}</span>
    </p>

    <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 10px;">Date:
        <span style="color: #DDDDDD; font-weight: normal;">${formattedDate}</span>
    </p>

    <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 10px;">Bottle Identification:
        <span style="color: #DDDDDD; font-weight: normal;">${experience.qrValue?.slice(0, experience.qrValue.length - 6)}</span>
    </p>

    <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 10px;">Wine:
        <span style="color: #DDDDDD; font-weight: normal;">${wine.name}</span>
    </p>

    <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 30px;">Bottle Number:
        <span style="color: #DDDDDD; font-weight: normal;">${wine.bottleNo}</span>
    </p>

    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; margin-bottom: 30px;">
        <div style="width: 100%; text-align: center;">
            <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 20px;">Check User's Profile:</p>
            <a href="https://openvino.org/user/${user.id}" target="_blank"
                style="text-decoration: none; padding: 12px 5%; font-weight: bold; background-color: #ffffff; font-size: 1rem; text-transform: uppercase; letter-spacing: .88px; text-align: center; color: #850d4a; cursor: pointer; border: 2px solid #850d4a; border-radius: 5px;">
                User Profile
            </a>
        </div>
        <div style="width: 100%; text-align: center;">
            <p style="color: #FFFFFF; font-size: 1rem; font-weight: bold; margin-bottom: 20px;">View Experience Details:</p>
            <a href="https://openvino.exchange/experience/${experience.id}" target="_blank"
                style="text-decoration: none; padding: 12px 5%; font-weight: bold; background-color: #d5841b; font-size: 1rem; text-transform: uppercase; letter-spacing: .88px; text-align: center; color: #FFFFFF; cursor: pointer; border: 2px solid #d5841b; border-radius: 5px;">
                Experience Details
            </a>
        </div>
    </div>
</div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }



}
