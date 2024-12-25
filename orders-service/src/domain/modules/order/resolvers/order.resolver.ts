import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Order } from '../model/order.model';
import { OrderService } from '../services/order.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private orderService: OrderService) {}

  @Query(() => [Order], { name: 'listOrders' })
  async listOrders() {
    return await this.orderService.listOrders();
  }

  @Mutation(() => Order, { name: 'createOrder' })
  async createOrder(
    @Args('productIds', { type: () => [String] }) productsIds: string[],
  ) {
    return await this.orderService.createOrder(productsIds);
  }
}
