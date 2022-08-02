import {useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import NotFound from '../components/Layout/NotFound.server';
import {Slogan} from '../components/Layout/Slogan.server';

export default function MissionPage(params) {
  const handle = params?.pathname?.replace('/', '');

  const {data} = useShopQuery({query: QUERY, variables: {handle}});

  if (!data.pageByHandle) {
    return <NotFound />;
  }

  const page = data.pageByHandle;

  return (
    <>
      <Slogan />
      <div className="text-text text-principal flex flex-col gap-12 max-w-[770px] md:mt-[-20px] m-auto w-full mb-[4rem]">
        <h2 className="text-principal font-bold text-subtitle text-center md:mb-[-20px]">
          missão
        </h2>
        <div dangerouslySetInnerHTML={{__html: page.body}}></div>
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
