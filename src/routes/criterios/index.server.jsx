import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Slogan} from '../../components/Layout/Slogan.server';
import TagDetail from '../../components/Tags/TagDetail.client';

export default function Collections({search}) {
  const {data} = useShopQuery({
    query: COLLECTIONS_QUERY,
    preload: true,
    cache: {maxAge: 60 * 60 * 24},
  });
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
          descriptionHtml
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
