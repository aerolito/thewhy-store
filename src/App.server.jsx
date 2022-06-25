import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, Route, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
// import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/DefaultSeo.server';
import NotFound from './components/NotFound.server';
import Layout from './components/Layout.server';
import {ApolloCustomProvider} from './providers/apollo-custom-provider.client';
import {BoxFallback} from './components/BoxFallback.server';
// import CookieBanner from './components/CookieBanner.client';

function App({routes}) {
  const shopifyConfig = {
    storeDomain: 'thewhy-store.myshopify.com',
    storefrontToken: import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN,
    storefrontApiVersion: '2022-04',
  };

  return (
    <Suspense fallback={<BoxFallback />}>
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        <ApolloCustomProvider>
          <DefaultSeo />
          <Router>
            <Layout>
              <FileRoutes routes={routes} />
              <Route path="*" page={<NotFound />} />
              {/* <CookieBanner /> */}
            </Layout>
          </Router>
        </ApolloCustomProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

const routes = import.meta.globEager('./routes/**/*.server.[jt](s|sx)');

export default renderHydrogen(App, {shopifyConfig, routes});
