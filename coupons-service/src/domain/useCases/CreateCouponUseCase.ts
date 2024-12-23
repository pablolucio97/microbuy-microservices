import { ConflictException, Injectable } from '@nestjs/common';
import {
  ICouponDTO,
  ICreateCouponDTO,
} from '../repositories/interfaces/dtos/CouponDTO';
import { CouponsService } from '../services/CouponsService';

@Injectable()
export class CreateCouponUseCase {
  constructor(private couponsService: CouponsService) {}

  async execute(data: ICreateCouponDTO): Promise<ICouponDTO> {
    const coupon = await this.couponsService.createCoupon(data);
    if (!coupon) {
      throw new ConflictException(
        'Some coupon with same value is being processed.',
      );
    }
    return coupon;
  }
}
