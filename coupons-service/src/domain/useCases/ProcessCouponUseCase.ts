import { Injectable, NotFoundException } from '@nestjs/common';
import { ICouponDTO } from '../repositories/interfaces/dtos/CouponDTO';
import { CouponsService } from '../services/CouponsService';

@Injectable()
export class ProcessCouponUseCase {
  constructor(private couponsService: CouponsService) {}

  async execute(total: number): Promise<ICouponDTO> {
    const coupon = await this.couponsService.processCoupon(total);
    if (!coupon) {
      throw new NotFoundException('Coupon not found.');
    }
    return coupon;
  }
}
