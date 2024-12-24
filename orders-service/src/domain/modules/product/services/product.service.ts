import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/services/PrismaService';
import { Product } from '../model/product.model';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async getProducts(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany();
    return products;
  }
}
