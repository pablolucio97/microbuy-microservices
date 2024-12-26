import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SendEmailUseCase } from '../../useCases/emails/SendEmailUseCase';
import { z } from 'zod';

const emailDataSchema = z.object({
  to: z.string().email(),
  order_id: z.string(),
  order_total: z.number(),
});

type emailDataSchema = z.infer<typeof emailDataSchema>;

@Controller('/emails/send')
export class SendEmailController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() emailData: emailDataSchema) {
    const validation = emailDataSchema.safeParse(emailData);
    if (!validation.success) {
      throw new BadRequestException(validation.error.errors);
    }
    try {
      await this.sendEmailUseCase.execute({
        order: {
          id: emailData.order_id,
          total: emailData.order_total,
        },
        to: emailData.to,
      });
      return { message: 'Email sent successfully' };
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
