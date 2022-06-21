import {
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
  CacheHours,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import {Suspense} from 'react';
import CustomToastContainer from './Toast.client';
import {BoxFallback} from './BoxFallback.server';
import {BackButton} from './BackButton.client';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export default function Layout({children, hero}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  });
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider preload="*">
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div className="min-h-screen max-w-screen text-gray-700 font-sans">
        <Suspense fallback={null}>
          <Header collections={collections} storeName={storeName} />
        </Suspense>
        <main role="main" id="mainContent" className="relative min-h-[75vh]">
          {hero}
          <Suspense fallback={null}>
            <CustomToastContainer />
          </Suspense>
          <div className="mx-auto max-w-[970px] p-4 md:py-5 md:px-8">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Suspense fallback={null}>
          <BackButton />
        </Suspense>
        <Suspense fallback={null}>
          <Footer collection={collections[0]} product={products[0]} />
        </Suspense>
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
