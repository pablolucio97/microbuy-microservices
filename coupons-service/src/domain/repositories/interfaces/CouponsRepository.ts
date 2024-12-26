import {
  ICouponDTO,
  ICreateCouponDTO,
  IProcessCouponDTO,
} from './dtos/CouponDTO';

export interface ICouponsRepository {
  createCoupon: (coupon: ICreateCouponDTO) => Promise<ICouponDTO>;
  listCoupons: () => Promise<ICouponDTO[]>;
  processCoupon: (data: IProcessCouponDTO) => Promise<ICouponDTO>;
}
