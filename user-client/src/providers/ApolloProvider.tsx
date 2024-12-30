"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

interface ApolloClientProvider {
  children: ReactNode;
}

export default function ApolloClientProvider({
  children,
}: ApolloClientProvider) {
  const apolloClient = new ApolloClient({
    uri: "http://localhost:3334/graphql",
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
