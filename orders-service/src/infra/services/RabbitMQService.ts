import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Channel, connect, Connection } from 'amqplib';
import { TEnvSchema } from 'env';
import { Order } from 'src/domain/modules/order/model/order.model';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;
  private exchange = 'orders';
  private queue = 'orders-queue';
  private routeBindingKey = 'orders-route-bind-key';

  constructor(private configService: ConfigService<TEnvSchema, true>) {
    this.initRabbitMQ();
  }

  private async initRabbitMQ() {
    const rabbitMQUser = this.configService.get('RABBITMQ_USER');
    const rabbitMQPassword = this.configService.get('RABBITMQ_PASSWORD');
    this.connection = await connect(
      `amqp://${rabbitMQUser}:${rabbitMQPassword}@rabbitmq/`,
    );
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.exchange, 'direct', {
      durable: true,
    });
    await this.channel.assertQueue(this.queue, { durable: true });
    await this.channel.bindQueue(
      this.queue,
      this.exchange,
      this.routeBindingKey,
    );
  }

  async publishOrderCreatedMessage(order: Order) {
    this.channel.publish(
      this.exchange,
      this.routeBindingKey,
      Buffer.from(JSON.stringify(order)),
    );
  }
  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
