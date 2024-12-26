import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { RabbitMQService } from 'src/infra/services/RabbitMQService';
import { OrdersResolver } from './resolvers/order.resolver';
import { OrderService } from './services/order.service';

@Module({
  providers: [PrismaService, OrderService, OrdersResolver, RabbitMQService],
})
export class OrdersModule {}
