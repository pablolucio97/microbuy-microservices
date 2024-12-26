import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from 'env';
import { EmailSenderModule } from './modules/emailSender.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EmailSenderModule,
  ],
})
export class AppModule {}
