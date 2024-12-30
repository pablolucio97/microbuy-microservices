import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: Order;
};


export type MutationCreateOrderArgs = {
  productIds: Array<Scalars['String']['input']>;
};

/** order */
export type Order = {
  __typename?: 'Order';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  products?: Maybe<Array<Product>>;
  total: Scalars['Float']['output'];
  was_processed: Scalars['Boolean']['output'];
};

/** product */
export type Product = {
  __typename?: 'Product';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  listOrders: Array<Order>;
  listProducts: Array<Product>;
};

export type ListOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrdersQuery = { __typename?: 'Query', listOrders: Array<{ __typename?: 'Order', id: string, total: number, was_processed: boolean, products?: Array<{ __typename?: 'Product', id: string, name: string, price: number }> | null }> };

export type CreateOrderMutationVariables = Exact<{
  productIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, total: number, was_processed: boolean } };

export type ListProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListProductsQuery = { __typename?: 'Query', listProducts: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number }> };


export const ListOrdersDocument = gql`
    query ListOrders {
  listOrders {
    id
    total
    was_processed
    products {
      id
      name
      price
    }
  }
}
    `;

/**
 * __useListOrdersQuery__
 *
 * To run a query within a React component, call `useListOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useListOrdersQuery(baseOptions?: Apollo.QueryHookOptions<ListOrdersQuery, ListOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrdersQuery, ListOrdersQueryVariables>(ListOrdersDocument, options);
      }
export function useListOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrdersQuery, ListOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrdersQuery, ListOrdersQueryVariables>(ListOrdersDocument, options);
        }
export function useListOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListOrdersQuery, ListOrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListOrdersQuery, ListOrdersQueryVariables>(ListOrdersDocument, options);
        }
export type ListOrdersQueryHookResult = ReturnType<typeof useListOrdersQuery>;
export type ListOrdersLazyQueryHookResult = ReturnType<typeof useListOrdersLazyQuery>;
export type ListOrdersSuspenseQueryHookResult = ReturnType<typeof useListOrdersSuspenseQuery>;
export type ListOrdersQueryResult = Apollo.QueryResult<ListOrdersQuery, ListOrdersQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($productIds: [String!]!) {
  createOrder(productIds: $productIds) {
    id
    total
    was_processed
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      productIds: // value for 'productIds'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const ListProductsDocument = gql`
    query ListProducts {
  listProducts {
    id
    name
    description
    price
  }
}
    `;

/**
 * __useListProductsQuery__
 *
 * To run a query within a React component, call `useListProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListProductsQuery(baseOptions?: Apollo.QueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
      }
export function useListProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
        }
export function useListProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListProductsQuery, ListProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListProductsQuery, ListProductsQueryVariables>(ListProductsDocument, options);
        }
export type ListProductsQueryHookResult = ReturnType<typeof useListProductsQuery>;
export type ListProductsLazyQueryHookResult = ReturnType<typeof useListProductsLazyQuery>;
export type ListProductsSuspenseQueryHookResult = ReturnType<typeof useListProductsSuspenseQuery>;
export type ListProductsQueryResult = Apollo.QueryResult<ListProductsQuery, ListProductsQueryVariables>;