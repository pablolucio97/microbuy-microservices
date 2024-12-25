import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'product' })
export class Product {
  @Field(() => ID)
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Float)
  price: number;
}
