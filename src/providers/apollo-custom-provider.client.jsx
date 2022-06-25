import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: process.env.VITE_URI,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.VITE_STOREFRONT_TOKEN,
  },
});

export function ApolloCustomProvider({children}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
