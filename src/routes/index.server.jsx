import {useShopQuery, Seo, CacheDays} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import Welcome from '../components/Home/Welcome.server';
import {Suspense} from 'react';
import Searcher from '../components/Home/Searcher.client';
import HowThisWorks from '../components/Home/HowThisWorks.server';
import Brands from '../components/Home/Brands.server';
import Contents from '../components/Home/Contents.server';
import Tags from '../components/Tags/Tags.server';
import {BoxFallback} from '../components/Layout/BoxFallback.server';

export default function Index() {
  return (
    <>
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Suspense fallback={<BoxFallback />}>
          <Welcome />
        </Suspense>
        <div className="relative mb-12 md:h-screen flex flex-col justify-center">
          <Suspense fallback={<BoxFallback />}>
            <Searcher />
          </Suspense>
          <Suspense fallback={<BoxFallback />}>
            <Tags />
          </Suspense>
        </div>
        <Suspense fallback={<BoxFallback />}>
          <HowThisWorks />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <Brands />
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <Contents />
        </Suspense>
      </div>
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;
