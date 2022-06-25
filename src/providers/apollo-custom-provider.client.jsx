import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: import.meta.env.VITE_URI,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': import.meta.env
      .VITE_STOREFRONT_ACCESS_TOKEN,
  },
});

export function ApolloCustomProvider({children}) {
  console.log();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
