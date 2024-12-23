import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/Prisma';
import { ICouponsRepository } from './interfaces/CouponsRepository';
import { ICreateCouponDTO } from './interfaces/dtos/CouponDTO';

@Injectable()
export class CouponsRepository implements ICouponsRepository {
  constructor(private prismaService: PrismaService) {}
  async createCoupon(coupon: ICreateCouponDTO) {
    const newCoupon = await this.prismaService.coupon.create({
      data: coupon,
    });
    return newCoupon;
  }
  async listCoupons() {
    const coupons = await this.prismaService.coupon.findMany();
    return coupons;
  }
  async checkNotProcessedCouponWithSameValueAlreadyExists(
    couponId: string,
    value: number,
  ) {
    const coupon = await this.prismaService.coupon.findFirst({
      where: {
        id: couponId,
        total: value,
        processed: false,
      },
    });
    return coupon;
  }
}
