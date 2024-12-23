import { Module } from '@nestjs/common';
import { CouponsRepository } from 'src/domain/repositories/CouponsRepository';
import { CouponsService } from 'src/domain/services/CouponsService';
import { CreateCouponUseCase } from 'src/domain/useCases/CreateCouponUseCase';
import { CreateCouponController } from '../controllers/CreateCouponController';
import { PrismaService } from '../services/Prisma';

@Module({
  controllers: [CreateCouponController],
  providers: [
    PrismaService,
    CouponsRepository,
    CouponsService,
    CreateCouponUseCase,
  ],
})
export class CouponsModule {}
