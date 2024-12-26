import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Channel, Connection, connect } from 'amqplib';
import { TEnvSchema } from 'env';

@Injectable()
export class RabbitMQService {
  private channel: Channel;
  private connection: Connection;
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

  async listenMessages() {
    const messages = [];
    await this.channel.consume(this.queue, (msg) => {
      if (msg !== null) {
        messages.push(msg.content.toString());
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return messages;
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
