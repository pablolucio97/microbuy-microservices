import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RabbitMQService } from 'src/services/RabbitMQService';
import { formatBRL } from 'src/utils/formats';
import { z } from 'zod';
import { SendEmailUseCase } from '../../useCases/emails/SendEmailUseCase';

const emailDataSchema = z.object({
  to: z.string().email(),
});

type emailDataSchema = z.infer<typeof emailDataSchema>;

@Controller('/emails/send')
export class SendEmailController {
  constructor(
    private readonly sendEmailUseCase: SendEmailUseCase,
    private rabbitMQService: RabbitMQService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() emailData: emailDataSchema) {
    const validation = emailDataSchema.safeParse(emailData);
    if (!validation.success) {
      throw new BadRequestException(validation.error.errors);
    }
    try {
      const TIMER = 2000
      const messages = await this.rabbitMQService.listenMessages(TIMER);
      if (messages) {
        const parsedMessages = [];
         //@ts-expect-error messages type is array
        for (const message of messages) {
          parsedMessages.push(JSON.parse(message));
        }
        for (const parsedMessage of parsedMessages) {
          await this.sendEmailUseCase.execute({
            order: {
              id: parsedMessage.id,
              total: formatBRL(parsedMessage.total),
            },
            to: emailData.to,
          });
        }

        return { message: 'Email sent successfully' };
      }
    } catch (error) {
      console.log('Error at trying to send email: ', error);
      throw new ConflictException({
        message:
          'An error occurred. Check all request body fields for possible mismatching.',
        error: error.message,
      });
    }
  }
}
