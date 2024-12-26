import { Module } from '@nestjs/common';
import { CouponsRepository } from 'src/domain/repositories/CouponsRepository';
import { CouponsService } from 'src/domain/services/CouponsService';
import { CreateCouponUseCase } from 'src/domain/useCases/CreateCouponUseCase';
import { ListCouponsUseCase } from 'src/domain/useCases/ListCouponsUseCase';
import { ProcessCouponUseCase } from 'src/domain/useCases/ProcessCouponUseCase';
import { CreateCouponController } from '../controllers/CreateCouponController';
import { ListCouponsController } from '../controllers/ListCouponsController';
import { ProcessCouponController } from '../controllers/ProcessCouponController';
import { PrismaService } from '../services/Prisma';
import { RabbitMQService } from '../services/RabbitMQService';

@Module({
  controllers: [
    CreateCouponController,
    ListCouponsController,
    ProcessCouponController,
  ],
  providers: [
    PrismaService,
    RabbitMQService,
    CouponsRepository,
    CouponsService,
    CreateCouponUseCase,
    ListCouponsUseCase,
    ProcessCouponUseCase,
  ],
})
export class CouponsModule {}
