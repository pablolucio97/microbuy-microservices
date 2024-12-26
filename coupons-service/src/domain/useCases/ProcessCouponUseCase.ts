import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ICouponDTO,
  IProcessCouponDTO,
} from '../repositories/interfaces/dtos/CouponDTO';
import { CouponsService } from '../services/CouponsService';

@Injectable()
export class ProcessCouponUseCase {
  constructor(private couponsService: CouponsService) {}

  async execute(data: IProcessCouponDTO): Promise<ICouponDTO> {
    const coupon = await this.couponsService.processCoupon(data);
    if (!coupon) {
      throw new NotFoundException('Coupon not found.');
    }
    return coupon;
  }
}
