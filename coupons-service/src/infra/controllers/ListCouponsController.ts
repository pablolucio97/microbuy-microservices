import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ListCouponsUseCase } from 'src/domain/useCases/ListCouponsUseCase';
import { RabbitMQService } from 'src/infra/services/RabbitMQService';
import { ProcessCouponUseCase } from './../../domain/useCases/ProcessCouponUseCase';

@Controller('/coupons/list')
export class ListCouponsController {
  constructor(
    private listCouponsUseCase: ListCouponsUseCase,
    private rabbitMQService: RabbitMQService,
    private processCouponUseCase: ProcessCouponUseCase,
  ) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle() {
    const LISTEN_TIMER = 2000;
    try {
      const coupons = await this.listCouponsUseCase.execute();
      const messages = await this.rabbitMQService.listenMessages(LISTEN_TIMER);
      const processedOrders = [];

      //@ts-expect-error messages type is array
      for (const message of messages) {
        const order = JSON.parse(message);
        const result = await this.processCouponUseCase.execute(order.total);
        processedOrders.push(result);
      }

      for (const processedOrder of processedOrders) {
        await this.rabbitMQService.publishProcessedOrderMessage(processedOrder);
      }

      return coupons;
    } catch (error) {
      console.log('INTERNAL ERROR:', error.message);
      throw new Error('Internal Server Error');
    }
  }
}
