import {useShopQuery, Seo, useRouteParams} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Slogan} from '../../components/Layout/Slogan.server';

import ProductDetails from '../../components/Products/ProductDetails.client';
import NotFound from '../../components/Layout/NotFound.server';
import {Suspense} from 'react';
import {BoxFallback} from '../../components/Layout/BoxFallback.server';
import Tags from '../../components/Tags/Tags.server';

export default function Product() {
  const {handle} = useRouteParams();

  const {
    data: {product},
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle: decodeURIComponent(handle),
    },
    preload: true,
    cache: {maxAge: 60 * 60 * 24},
  });

  const {data: pageByHandle} = useShopQuery({
    query: VENDOR_QUERY,
    variables: {
      vendor: product?.vendor?.toLowerCase(),
    },
    preload: false,
    cache: {maxAge: 60 * 60 * 24},
  });

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <div className="mb-12">
        <Suspense fallback={<BoxFallback />}>
          <Seo type="product" data={product} />
        </Suspense>
        <Slogan />
        <Suspense fallback={<BoxFallback />}>
          <ProductDetails product={product} vendorData={pageByHandle} />
        </Suspense>
        <Tags />
      </div>
    </>
  );
}

const QUERY = gql`
  query product($handle: String!) {
    product: product(handle: $handle) {
      compareAtPriceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
      }
      collections(first: 30) {
        edges {
          node {
            handle
            metafields(
              identifiers: [{namespace: "my_fields", key: "collection_logo"}]
            ) {
              value
            }
          }
        }
      }
      description
      descriptionHtml
      featuredImage {
        url
        width
        height
        altText
      }
      handle
      id
      media(first: 6) {
        edges {
          node {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
      metafields(identifiers: [{namespace: "my_fields", key: "link"}]) {
        namespace
        key
        value
      }
      seo {
        description
        title
      }
      title
      variants(first: 249) {
        edges {
          node {
            availableForSale
            id
            title
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      vendor
    }
  }
`;

const VENDOR_QUERY = gql`
  query PageDetails($vendor: String!) {
    pageByHandle(handle: $vendor) {
      title
      body
      handle
      seo {
        description
        title
      }
    }
  }
`;
