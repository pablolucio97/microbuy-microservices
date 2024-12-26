import { Injectable } from '@nestjs/common';
import { IEmailData, SendGridEmailSender } from '../../services/SendGrid';

@Injectable()
export class SendEmailUseCase {
  constructor(private sendGridEmailSender: SendGridEmailSender) {}
  async execute(data: IEmailData) {
    await this.sendGridEmailSender.sendEmail(data);
  }
}
