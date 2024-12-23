import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ICreateCouponDTO } from 'src/domain/repositories/interfaces/dtos/CouponDTO';
import { CreateCouponUseCase } from 'src/domain/useCases/CreateCouponUseCase';
import { z } from 'zod';

const createCouponSchema = z.object({
  total: z.number(),
});

@Controller('/coupons/create')
export class CreateCouponController {
  constructor(private createCouponUseCase: CreateCouponUseCase) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() body: ICreateCouponDTO) {
    const isBodyValid = createCouponSchema.safeParse(body);

    if (!isBodyValid.success) {
      throw new BadRequestException(isBodyValid.error.errors);
    }

    try {
      const coupon = await this.createCouponUseCase.execute(body);
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
