import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RabbitMQService } from 'src/infra/services/RabbitMQService';
import { Order } from '../model/order.model';
import { OrderService } from '../services/order.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(
    private orderService: OrderService,
    private rabbitMQService: RabbitMQService,
  ) {}

  @Query(() => [Order], { name: 'listOrders' })
  async listOrders() {
    return await this.orderService.listOrders();
  }

  @Mutation(() => Order, { name: 'createOrder' })
  async createOrder(
    @Args('productIds', { type: () => [String] }) productsIds: string[],
  ) {
    const order = await this.orderService.createOrder(productsIds);
    if (order) {
      await this.rabbitMQService.publishOrderCreatedMessage(order).then(() => {
        console.log('Message published');
      });
    }
    return order;
  }
}
