import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, Route, FileRoutes, ShopifyProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';
import shopifyConfig from '../shopify.config';
import DefaultSeo from './components/Layout/DefaultSeo.server';
import NotFound from './components/Layout/NotFound.server';
import Layout from './components/Layout/Layout.server';
import {ApolloCustomProvider} from './providers/apollo-custom-provider.client';
import {BoxFallback} from './components/Layout/BoxFallback.server';

function App({routes}) {
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
