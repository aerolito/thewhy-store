import {useShopQuery, Seo, flattenConnection, Image} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';
import {BoxFallback} from '../../components/Layout/BoxFallback.server';
import NotFound from '../../components/Layout/NotFound.server';
import ProductList from '../../components/Products/ProductList.client';
import {Slogan} from '../../components/Layout/Slogan.server';

export default function Page({params, pathname}) {
  const {handle} = params;

  const {data} = useShopQuery({query: QUERY, variables: {handle}});
  const {data: productsByQuery} = useShopQuery({
    query: PRODUCTS,
    variables: {
      vendor: decodeURIComponent(handle),
      country: 'US',
    },
    preload: true,
  });

  const unformattedProducts = productsByQuery
    ? flattenConnection(productsByQuery.products)
    : null;

  const products = unformattedProducts
    ? unformattedProducts
        ?.map((product) => {
          return {
            ...product,
            collections: flattenConnection(product.collections),
          };
        })
        ?.filter((product) => product.vendor === handle)
        ?.slice(0, 3)
    : null;

  if (!data.pageByHandle) {
    return <NotFound />;
  }

  const page = data.pageByHandle;

  return (
    <>
      <Seo type="page" data={page} />
      <Slogan />
      <div className="flex flex-col justify-center items-center gap-12 mb-12">
        <Image
          alt={handle}
          src={`https://cdn.shopify.com/s/files/1/0583/2779/3826/files/${handle}.svg`}
          className=""
          width="265px"
          height="60px"
        />
        <div
          className="mb-20 text-principal text-text  text-justify md:text-left"
          dangerouslySetInnerHTML={{__html: page.body}}
        />

        {pathname?.includes('/marcas') && products && products?.length > 0 && (
          <Suspense fallback={<BoxFallback />}>
            <ProductList products={products} />
          </Suspense>
        )}
      </div>
    </>
  );
}

const QUERY = gql`
  query PageDetails($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      body
      title
      seo {
        description
        title
      }
    }
  }
`;

const PRODUCTS = gql`
  query productsByVendor($vendor: String!) {
    products(first: 249, query: $vendor) {
      edges {
        node {
          featuredImage {
            src
          }
          title
          vendor
          handle
          id
          collections(first: 249) {
            edges {
              node {
                handle
                metafield(namespace: "my_fields", key: "collection_logo") {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;
