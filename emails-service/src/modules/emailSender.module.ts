import { Module } from '@nestjs/common';
import { SendEmailController } from 'src/controllers/emails/SendEmailController';
import { RabbitMQService } from 'src/services/RabbitMQService';
import { SendGridEmailSender } from 'src/services/SendGrid';
import { SendEmailUseCase } from '../useCases/emails/SendEmailUseCase';

@Module({
  providers: [SendEmailUseCase, SendGridEmailSender, RabbitMQService],
  controllers: [SendEmailController],
})
export class EmailSenderModule {}
