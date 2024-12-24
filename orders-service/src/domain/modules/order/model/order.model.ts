import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Product } from '../../product/model/product.model';

@ObjectType({ description: 'order' })
export class Order {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field(() => Float)
  get total(): number {
    if (!this.products || this.products.length === 0) {
      return 0;
    }
    return this.products.reduce((acc, op) => acc + op.price, 0);
  }
}
