import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { CreateOrderInput } from '../inputs/orderInputs';
import { Order } from '../model/order.model';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async createOrder(data: CreateOrderInput): Promise<Order> {
    const newOrder = await this.prismaService.order.create({
      data,
    });
    return newOrder;
  }
  async listOrders(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany();
    return orders;
  }
}
