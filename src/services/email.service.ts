import {bind, BindingScope} from '@loopback/core';
import {createTransport, SentMessageInfo} from 'nodemailer';
import {EmailTemplate, Experience, UserWithRelations, WineWithRelations} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  /**
   * If using gmail see https://nodemailer.com/usage/using-gmail/
   */
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

  async sendResetPasswordMail(user: UserWithRelations): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: process.env.SMTP_USERNAME,
      to: user.email,
      subject: '[YDI-YOI] Reset Password Reques',
      html: `
      <div>
        <h2>Estimado/a</h2>
        <h2>${user.firstName} ${user.lastName}</h2>
        <p>Ud. ha solicitado cambio de clave como usuario de la App de OpenVino YDI-YOI.</p>
        <p>Para modificar debe hacer clic en el siguiente enlace:
        <a href="${process.env.APPLICATION_URL}/reset-password-finish.html?resetKey=${user.resetKey}">Cambiar contraseña</a>
        <p>Y a continuación, deberá ingresar los datos que pide la página.</p>
        <p>Saludos cordiales</p>
        <p><strong>Cualquier inconveniente puede escribir a este correo.</strong></p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }

  // Experience confirmation email to user
  async sendXpConfirmation(user: UserWithRelations, experience: Experience): Promise<SentMessageInfo> {
    const transporter = await EmailService.setupTransporter();
    const emailTemplate = new EmailTemplate({
      from: process.env.SMTP_USERNAME,
      to: user.email,
      subject: '[YDI-YOI] Confirmación de experiencia',
      html: `
      <div>
      <h2>Estimado/a</h2>
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>Su experiencia con nuestro vino se ha registrado exitosamente</p>
      <p>Fecha: ${experience.date}</p>
      <p>Ubicación: ${experience.location}</p>
      <p>Identificación de la botella: ${experience.qrValue}</p>
      <p>¡Muchas gracias!</p>
      <p>Saludos cordiales</p>
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
      from: process.env.SMTP_USERNAME,
      to: process.env.SMTP_ADMINUSER,
      subject: '[YDI-YOI] Nueva experiencia registrada',
      html: `
      <div>
      <h2>Aviso de nueva experiencia registrada por el usuario</h2>
      <h2>${user.firstName} ${user.lastName}</h2>
      <p>Los datos de la experiencia registrada son los siguientes</p>
      <p>Fecha: ${experience.date}</p>
      <p>Ubicación: ${experience.location}</p>
      <p>Identificación de la botella: ${experience.qrValue}</p>
      <p>Vino: ${wine.name}</p>
      <p>Botella: ${wine.bottleNo}</p>
      <p>Token: ${wine.tokenSymbol} Valor: ${wine.tokenValue}</p>
      <p>Saludos cordiales</p>
      </div>
      `,
    });
    return transporter.sendMail(emailTemplate);
  }

}
