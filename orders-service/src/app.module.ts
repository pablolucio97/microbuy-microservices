import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { OrdersModule } from './domain/modules/order/order.module';
import { ProductsModule } from './domain/modules/product/product.module';

@Module({
  imports: [
    OrdersModule,
    ProductsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
