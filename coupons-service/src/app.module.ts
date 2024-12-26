import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CouponsModule } from './infra/modules/coupons.module';
import { envSchema } from 'env';

@Module({
  imports: [
    CouponsModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
