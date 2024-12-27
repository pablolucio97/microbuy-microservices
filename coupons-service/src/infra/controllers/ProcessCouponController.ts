import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { IProcessCouponDTO } from 'src/domain/repositories/interfaces/dtos/CouponDTO';
import { ProcessCouponUseCase } from 'src/domain/useCases/ProcessCouponUseCase';
import { z } from 'zod';

const processCouponSchema = z.object({
  total: z.number(),
});

@Controller('/coupons/process')
export class ProcessCouponController {
  constructor(private processCouponUseCase: ProcessCouponUseCase) {}
  @Patch()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: IProcessCouponDTO) {
    const isBodyValid = processCouponSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new BadRequestException(isBodyValid.error.errors);
    }

    try {
      const coupon = await this.processCouponUseCase.execute(body.total);
      return coupon;
    } catch (error) {
      console.log('INTERNAL ERROR] :', error.message);
      if (error.status && error.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }
}
