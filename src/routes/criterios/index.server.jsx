import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Slogan} from '../../components/Slogan.server';
import {BackButton} from '../../components/BackButton.client';
import TagDetail from '../../components/TagDetail.client';

export default function Collections({search}) {
  const {data} = useShopQuery({query: COLLECTIONS_QUERY, preload: true});
  const unformattedCollections = data
    ? flattenConnection(data.collections)
    : null;
  const collections = unformattedCollections
    ? unformattedCollections?.map((collection) => {
        return {
          ...collection,
          metafields: flattenConnection(collection.metafields),
        };
      })
    : null;

  const initialSelectedTag = search?.split('?detalhes=')[1];

  return (
    <>
      <Slogan />
      <div className="text-text text-principal text-center flex flex-col md:mt-[-44px] gap-[2rem] max-w-[1024px] m-auto w-full mb-[2rem]">
        <TagDetail
          collections={collections}
          initialSelectedTag={initialSelectedTag}
        />
      </div>
    </>
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
          description
          image {
            url
          }
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
  }
`;
