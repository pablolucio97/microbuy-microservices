import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEnvSchema } from 'env';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const emailSender = require('@sendgrid/mail');

export interface IEmailData {
  to: string;
  order: {
    id: string;
    total: number;
  };
}

@Injectable()
export class SendGridEmailSender {
  constructor(private configService: ConfigService<TEnvSchema, true>) {}
  async sendEmail(data: IEmailData) {
    const sendGridApiKey = this.configService.get(
      'SEND_GRID_EMAIL_SENDER_API_KEY',
    );

    const emailSendAuthor = this.configService.get(
      'SEND_GRID_EMAIL_SENDER_AUTHOR',
    );

    emailSender.setApiKey(sendGridApiKey);

    const { to, order } = data;

    const htmlContent = `
    <div style="display: flex; flex-direction: column;">
        <span>
         Seu cupom fiscal de número <strong>${order.id}</strong> foi processado e está disponível.
        </span>
        <br />
        <br />
        <span>
         Sua compra no valor <strong>${order.total}</strong> foi finalizada com sucesso.
        </span>
    </div>`;

    const email = {
      to,
      from: emailSendAuthor,
      subject: 'Ordem processada com sucesso',
      html: htmlContent,
    };

    emailSender
      .send(email)
      .then(() => console.log('Email sent.'))
      .catch((error) => {
        console.log('Error at sending email: ', error);
      });
  }
}
