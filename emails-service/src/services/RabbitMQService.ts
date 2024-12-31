import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Channel, connect, Connection } from 'amqplib';
import { TEnvSchema } from 'env';

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private exchange = 'orders';
  private queue = 'orders-queue';
  private routeBindingKey = 'orders-route-bind-key';

  constructor(private configService: ConfigService<TEnvSchema, true>) {
    this.initRabbitMQ();
  }
  onModuleDestroy() {
    this.close();
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

  async listenMessages(timeout) {
    const messages = [];
    return new Promise((resolve, reject) => {
      const onMessage = (msg) => {
        if (msg) {
          messages.push(msg.content.toString());
        }
      };

      this.channel
        .consume(this.queue, onMessage, { noAck: false })
        .then((consumer) => {
          setTimeout(async () => {
            await this.channel.cancel(consumer.consumerTag);
            resolve(messages);
          }, timeout);
        })
        .catch(reject);
    });
  }
  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
