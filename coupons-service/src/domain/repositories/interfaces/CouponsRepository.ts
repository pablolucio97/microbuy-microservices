import { ICouponDTO, ICreateCouponDTO } from './dtos/CouponDTO';

export interface ICouponsRepository {
  createCoupon: (coupon: ICreateCouponDTO) => Promise<ICouponDTO>;
  listCoupons: () => Promise<ICouponDTO[]>;
}
