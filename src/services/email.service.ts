import {bind, BindingScope} from '@loopback/core';
import {createTransport, SentMessageInfo} from 'nodemailer';
import {EmailTemplate, Experience, UserWithRelations, WineWithRelations} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {

  // working with local .ENV variables
  private static async setupTransporter() {
    return createTransport({
      host: process.env.SMTP_SERVER,
      port: +process.env.SMTP_PORT!,
      secure: true, //false: upgrade later with STARTTLS - true: using ferozo
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
      debug: true,
      logger: true
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
  async sendResetPasswordMail(user: UserWithRelations): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: 'team@baas256.com',
      to: user.email,
      subject: '[YDI-YOI] Reset Password Request',
      html: `
      <div>
        <h2>Dear</h2>
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>You have requested a password change as a user of the OpenVino App.</p>
        <p>To modify it you must click on the following link:
        <a href="${process.env.APPLICATION_URL}/app/update-password?resetKey=${user.resetKey}">change Password</a>
        <p>Next, you must enter the information requested by the page.</p>
        <p>Kind regards</p>
        <p><strong>Any questions you can answer this email.</strong></p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }

  // Experience confirmation email to user
  async sendXpConfirmation(user: UserWithRelations, experience: Experience): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: 'team@baas256.com',
      to: user.email,
      subject: '[YDI-YOI] New experience confirmation',
      html: `
      <div>
      <h2>Dear</h2>
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>Your experience with our wine has been successfully registered</p>
      <p>Date: ${experience.date}</p>
      <p>Location: ${experience.location}</p>
      <p>Bottle Identification: ${experience.qrValue}</p>
      <p>Thanks a lot!</p>
      <p>regards</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }

  // Experience confirmation email to admin
  async sendXpConfirmationAdmin(
    user: UserWithRelations,
    experience: Experience,
    wine: WineWithRelations): Promise<SentMessageInfo> {

    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: 'team@baas256.com',
      to: 'team@baas256.com',
      subject: '[YDI-YOI] A new experience has been registered',
      html: `
      <div>
      <h2>A new experience has been registered by the user: </h2>
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>The data of the registered experience are the following: </p>
      <p>Date: ${experience.date}</p>
      <p>Location: ${experience.location}</p>
      <p>Bottle Identification: ${experience.qrValue}</p>
      <p>Wine: ${wine.name}</p>
      <p>Bottle no: ${wine.bottleNo}</p>
      <p>Token: ${wine.tokenSymbol} Valor: ${wine.tokenValue}</p>
      <p>regards</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }

}
