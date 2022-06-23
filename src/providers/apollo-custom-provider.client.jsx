import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://thewhy-store.myshopify.com/api/2022-04/graphql.json',
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': '8da66e4bcd6184accb29e483d1e1403b',
  },
});

export function ApolloCustomProvider({children}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
