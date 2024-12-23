import { Injectable } from '@nestjs/common';
import { CouponsService } from '../services/CouponsService';

@Injectable()
export class ListCouponsUseCase {
  constructor(private couponsService: CouponsService) {}
  async execute() {
    const coupons = await this.couponsService.listCoupons();
    return coupons;
  }
}
