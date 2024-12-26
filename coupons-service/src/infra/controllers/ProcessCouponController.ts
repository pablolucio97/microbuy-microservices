import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { IProcessCouponDTO } from 'src/domain/repositories/interfaces/dtos/CouponDTO';
import { ProcessCouponUseCase } from 'src/domain/useCases/ProcessCouponUseCase';
import { z } from 'zod';

const processCouponSchema = z.object({
  id: z.string(),
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
      const coupon = await this.processCouponUseCase.execute(body);
      return coupon;
    } catch (error) {
      console.log('INTERNAL ERROR] :', error.message);
      if (error.status && error.status === HttpStatus.CONFLICT) {
        throw new ConflictException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }
}
