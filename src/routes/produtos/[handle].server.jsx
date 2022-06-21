import {useShopQuery, Seo, useRouteParams} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Slogan} from '../../components/Slogan.server';

import ProductDetails from '../../components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import {Suspense} from 'react';
import {BoxFallback} from '../../components/BoxFallback.server';
import Tags from '../../components/Tags.server';
import {BackButton} from '../../components/BackButton.client';

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
  });

  const {data: pageByHandle} = useShopQuery({
    query: VENDOR_QUERY,
    variables: {
      vendor: product?.vendor?.toLowerCase(),
    },
    preload: false,
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
            metafields(first: 1) {
              edges {
                node {
                  value
                }
              }
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
              mediaContentType
              image {
                id
                url
                altText
                width
                height
              }
            }
            ... on Video {
              mediaContentType
              id
              previewImage {
                url
              }
              sources {
                mimeType
                url
              }
            }
            ... on ExternalVideo {
              mediaContentType
              id
              embedUrl
              host
            }
            ... on Model3d {
              mediaContentType
              id
              alt
              mediaContentType
              previewImage {
                url
              }
              sources {
                url
              }
            }
          }
        }
      }
      metafields(first: 20) {
        edges {
          node {
            id
            type
            namespace
            key
            value
            createdAt
            updatedAt
            description
            reference {
              __typename
              ... on MediaImage {
                id
                mediaContentType
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
        }
      }
      priceRange {
        maxVariantPrice {
          currencyCode
          amount
        }
        minVariantPrice {
          currencyCode
          amount
        }
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
            compareAtPriceV2 {
              amount
              currencyCode
            }
            id
            image {
              id
              url
              altText
              width
              height
            }
            metafields(first: 10) {
              edges {
                node {
                  id
                  type
                  namespace
                  key
                  value
                  createdAt
                  updatedAt
                  description
                  reference {
                    __typename
                    ... on MediaImage {
                      id
                      mediaContentType
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
              }
            }
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
            unitPriceMeasurement {
              measuredType
              quantityUnit
              quantityValue
              referenceUnit
              referenceValue
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
