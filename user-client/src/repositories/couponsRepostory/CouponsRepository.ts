import { couponsApi } from "../../services/couponsService";
import { ICouponDTO, ICreateCouponDTO } from "../dtos/CouponDTO";
import { ICouponsRepository } from "./interface";

export class CouponsRepository implements ICouponsRepository {
  async listCoupons(): Promise<ICouponDTO[]> {
    try {
      const response = await couponsApi.get("/coupons/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async processCoupon(total: number) {
    try {
      const response = await couponsApi.patch("/coupons/process", {
        data: { total },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async createCoupon(data: ICreateCouponDTO) {
    try {
      const response = await couponsApi.post("/coupons/create", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
