import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Suspense} from 'react';
import Tag from './Tag.client';

export default function Tags({title = true, filteredCollections}) {
  const {data} = useShopQuery({query: COLLECTIONS_QUERY, preload: true});
  const unformattedCollections = data
    ? flattenConnection(data.collections)
    : null;
  const collections = filteredCollections
    ? filteredCollections?.map((collection) => {
        return {
          ...collection,
          metafields: [{}, {value: collection?.metafield?.value}],
        };
      })
    : unformattedCollections
    ? unformattedCollections?.map((collection) => {
        return {
          ...collection,
          metafields: flattenConnection(collection.metafields),
        };
      })
    : null;

  return (
    <div className="text-center flex flex-col justify-center items-center">
      {title && (
        <h2 className="text-principal text-subtitleMobile md:text-subtitle font-bold mb-12 mt-6">
          nossos critérios
        </h2>
      )}
      <div className="flex flex-wrap w-[90vw] justify-center mt-[-10px] items-center md:flex-row">
        {collections &&
          collections?.map((collection) => (
            <Suspense>
              <Tag key={collection.handle} collection={collection} />
            </Suspense>
          ))}
      </div>
    </div>
  );
}

const COLLECTIONS_QUERY = gql`
  query SearcherContent {
    collections(first: 10) {
      edges {
        node {
          title
          id
          handle
          image {
            url
          }
          metafields(first: 2) {
            edges {
              node {
                value
              }
            }
          }
        }
      }
    }
  }
`;
