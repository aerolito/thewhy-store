import {flattenConnection, useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

export default function Brands() {
  const {data} = useShopQuery({query: BRANDS_QUERY, preload: true});
  const collections = data ? flattenConnection(data.collections) : null;
  const brands = collections
    ? [
        ...new Set(
          collections
            ?.map((collection) => {
              return flattenConnection(collection.products)?.map((product) => {
                return product?.vendor;
              });
            })
            ?.filter((brand) => brand),
        ),
      ]
    : null;

  let emptyArrayCol = [];

  const concatenatedArraysCol = emptyArrayCol.concat(
    ...new Set(
      brands?.map((brand) => {
        return brand;
      }),
    ),
  );

  const formattedBrands = [...new Set(concatenatedArraysCol)];

  return (
    <div className="my-20">
      <h2 className="text-center text-principal text-subtitleMobile md:text-subtitle font-bold mb-12">
        marcas
      </h2>
      <div className="flex flex-wrap gap-4 w-[90%] justify-center m-auto">
        {formattedBrands?.map((brand) => {
          return (
            <a href={`/marcas/${brand}`} key={brand}>
              <img
                key={brand}
                src={`https://cdn.shopify.com/s/files/1/0583/2779/3826/files/${brand?.replace(
                  ' ',
                  '_',
                )}.svg`}
                className="w-[20vw] h-[20vw] object-contain max-w-[170px] max-h-[130px]"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

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
