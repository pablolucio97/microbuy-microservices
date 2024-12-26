import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListCouponsUseCase } from 'src/domain/useCases/ListCouponsUseCase';
import { RabbitMQService } from 'src/infra/services/RabbitMQService';

@Controller('/coupons/list')
export class ListCouponsController {
  constructor(
    private listCouponsUseCase: ListCouponsUseCase,
    private rabbitMQService: RabbitMQService,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    try {
      const coupons = await this.listCouponsUseCase.execute();
      await this.rabbitMQService.listenMessages();
      return coupons;
    } catch (error) {
      console.log('INTERNAL ERROR:', error.message);
      throw new Error('Internal Server Error');
    }
  }
}
