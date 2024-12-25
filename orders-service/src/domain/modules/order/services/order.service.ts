import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { Order } from '../model/order.model';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}
  async createOrder(productIds: string[]): Promise<Order> {
    const products = await this.prismaService.product.findMany({
      where: { id: { in: productIds } },
    });

    const total = products.reduce((acc, prod) => acc + prod.price, 0);

    const newOrder = await this.prismaService.order.create({
      data: {
        total,
        order_products: {
          create: products.map((product) => ({
            product_id: product.id,
          })),
        },
      },
    });
    return newOrder;
  }
  async listOrders(): Promise<Order[]> {
    const orders = await this.prismaService.order.findMany({
      include: {
        order_products: {
          include: {
            product: true,
          },
        },
      },
    });
    return orders.map((order) => ({
      ...order,
      products: order.order_products.map((op) => op.product),
    }));
  }
}
