import { Query, Resolver } from '@nestjs/graphql';
import { Product } from '../model/product.model';
import { ProductService } from '../services/product.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [Product], { name: 'listProducts' })
  async products(): Promise<Product[]> {
    return await this.productService.getProducts();
  }
}
