import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  price: number;

  @Field(() => String)
  description: string;
}
