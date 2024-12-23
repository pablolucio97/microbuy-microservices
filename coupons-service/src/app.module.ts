import { Module } from '@nestjs/common';
import { CouponsModule } from './infra/modules/coupons.module';

@Module({
  imports: [CouponsModule],
})
export class AppModule {}
