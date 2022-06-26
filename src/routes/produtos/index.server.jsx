import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import Tags from '../../components/Tags/Tags.server';
import Filter from '../../components/Products/Filter.client';
import ProductList from '../../components/Products/ProductList.client';
import {Suspense} from 'react';
import {BoxFallback} from '../../components/Layout/BoxFallback.server';
import {Slogan} from '../../components/Layout/Slogan.server';

export default function ProductsPage(req) {
  const params = req?.request?.preloadURL;

  const query = params?.split('?filter=')[1];

  const {data} = useShopQuery({
    query: PRODUCTS,
    variables: {
      tag: decodeURIComponent(query),
      country: 'US',
    },
    preload: false,
  });

  const {data: unformattedCollectionsFilterOptions} = useShopQuery({
    query: COLLECTIONS_QUERY,
    preload: true,
  });

  const {data: unformattedBrandsFilterOptions} = useShopQuery({
    query: BRANDS_QUERY,
    preload: true,
  });

  const collectionsFilterOptions = unformattedCollectionsFilterOptions
    ? flattenConnection(unformattedCollectionsFilterOptions.collections)?.map(
        (collection) => {
          return collection?.title;
        },
      )
    : null;

  const unformattedColBrandsFilterOptions = unformattedBrandsFilterOptions
    ? flattenConnection(unformattedBrandsFilterOptions.collections)?.map(
        (collection) => {
          return flattenConnection(collection?.products)?.map((product) => {
            return product?.vendor;
          });
        },
      )
    : null;

  let emptyArrayCol = [];

  const concatenatedArraysCol = emptyArrayCol.concat(
    ...new Set(
      unformattedColBrandsFilterOptions?.map((product) => {
        return product;
      }),
    ),
  );

  const brandsFilterOptions = [...new Set(concatenatedArraysCol)];

  const unformattedProducts = data ? flattenConnection(data.products) : null;
  const products = unformattedProducts
    ? unformattedProducts?.map((product) => {
        return {
          ...product,
          collections: flattenConnection(product.collections),
        };
      })
    : null;

  return (
    <>
      <div className="mb-12">
        <Slogan />
        <div className=" min-h-[50vh] flex my-12 gap-12 md:gap-0 flex-col md:flex-row">
          {products && products?.length > 0 ? (
            <>
              <div className="flex flex-col items-center md:gap-12 md:absolute md:left-[3rem]">
                <Suspense fallback={<BoxFallback />}>
                  <Filter
                    products={products}
                    options={collectionsFilterOptions}
                    type="collections"
                    label="CRITÉRIOS"
                  />
                </Suspense>

                <Suspense fallback={<BoxFallback />}>
                  <Filter
                    products={products}
                    options={brandsFilterOptions}
                    type="brands"
                    label="MARCAS"
                  />
                </Suspense>
              </div>
              <div className="w-[91%] lg:w-full m-auto">
                <Suspense fallback={<BoxFallback />}>
                  <ProductList products={products} />
                </Suspense>
              </div>
            </>
          ) : (
            <h3 className="font-bold text-principal text-smallTitle m-auto">
              Não temos esse produto :(
            </h3>
          )}
        </div>
        <Tags />
      </div>
    </>
  );
}

const PRODUCTS = gql`
  query products($tag: String!) {
    products(first: 249, query: $tag) {
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
                title
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

const COLLECTIONS_QUERY = gql`
  query SearcherContent {
    collections(first: 249) {
      edges {
        node {
          title
        }
      }
    }
  }
`;

const BRANDS_QUERY = gql`
  query SearcherContent {
    collections(first: 249) {
      edges {
        node {
          products(first: 249) {
            edges {
              node {
                vendor
              }
            }
          }
        }
      }
    }
  }
`;
