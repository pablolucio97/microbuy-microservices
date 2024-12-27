import { Injectable } from '@nestjs/common';
import { CouponsRepository } from '../repositories/CouponsRepository';
import { ICouponsRepository } from '../repositories/interfaces/CouponsRepository';
import { ICreateCouponDTO } from '../repositories/interfaces/dtos/CouponDTO';

@Injectable()
export class CouponsService implements ICouponsRepository {
  constructor(private couponsRepository: CouponsRepository) {}
  async createCoupon(coupon: ICreateCouponDTO) {
    const couponWithSameValueNotProcessed =
      await this.couponsRepository.checkNotProcessedCouponWithSameValueAlreadyExists(
        coupon.id,
        coupon.total,
      );
    if (couponWithSameValueNotProcessed) {
      return null;
    }
    return this.couponsRepository.createCoupon(coupon);
  }
  async listCoupons() {
    return this.couponsRepository.listCoupons();
  }
  async processCoupon(total: number) {
    return this.couponsRepository.processCoupon(total);
  }
}
