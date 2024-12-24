import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Float)
  total: number;
}
