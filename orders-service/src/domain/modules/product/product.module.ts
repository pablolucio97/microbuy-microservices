import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { ProductsResolver } from './resolvers/product.resolver';
import { ProductService } from './services/product.service';

@Module({
  providers: [PrismaService, ProductService, ProductsResolver],
})
export class ProductsModule {}
