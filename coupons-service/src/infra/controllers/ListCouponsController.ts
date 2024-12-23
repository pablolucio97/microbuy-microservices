import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListCouponsUseCase } from 'src/domain/useCases/ListCouponsUseCase';

@Controller('/coupons/list')
export class ListCouponsController {
  constructor(private listCouponsUseCase: ListCouponsUseCase) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    try {
      const coupon = await this.listCouponsUseCase.execute();
      return coupon;
    } catch (error) {
      console.log(error);
    }
  }
}
