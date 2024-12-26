import { Module } from '@nestjs/common';
import { SendEmailController } from 'src/controllers/emails/SendEmailController';
import { SendGridEmailSender } from 'src/services/SendGrid';
import { SendEmailUseCase } from 'src/useCases/emails/sendEmailUseCase';

@Module({
  providers: [SendEmailUseCase, SendGridEmailSender],
  controllers: [SendEmailController],
})
export class EmailSenderModule {}
