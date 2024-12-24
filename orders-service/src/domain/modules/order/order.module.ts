import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { OrderService } from './services/order.service';
import { OrdersResolver } from './resolvers/order.resolver';

@Module({
  providers: [PrismaService, OrderService, OrdersResolver],
})
export class OrdersModule {}
